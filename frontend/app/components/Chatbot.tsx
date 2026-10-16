"use client";

import { useEffect, useRef, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  AlertCircle,
  ArrowUp,
  FileText,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { useAiChatMutation } from "@/lib/services/aiApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  isError?: boolean;
};

const suggestions = [
  {
    icon: Search,
    text: "What is the procedure for processing a service-related request?",
  },
  {
    icon: FileText,
    text: "Summarise the latest circular on leave rules.",
  },
  {
    icon: Quote,
    text: "Which office order covers delegation of financial powers?",
  },
];

function parseReply(data: unknown): { content: string; sources?: string[] } {
  if (typeof data === "string") return { content: data };

  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    const text = [d.answer, d.response, d.message, d.content, d.result].find(
      (v) => typeof v === "string"
    ) as string | undefined;

    const rawSources = d.sources ?? d.references;
    const sourceLabels = Array.isArray(rawSources)
      ? rawSources
          .map((source) => {
            if (typeof source === "string") return source.trim();
            if (!source || typeof source !== "object") return "";

            const item = source as Record<string, unknown>;
            return String(
              item.title ?? item.filename ?? item.name ?? item.source ?? ""
            ).trim();
          })
          .filter(Boolean)
      : [];

    // One chip per source document, even when retrieval returns several chunks.
    const sources = [...new Map(
      sourceLabels.map((label) => [label.toLocaleLowerCase(), label])
    ).values()];

    return {
      content: text ?? JSON.stringify(data, null, 2),
      sources: sources.length ? sources : undefined,
    };
  }

  return { content: String(data ?? "") };
}

type ChatBotProps = {
  className?: string;
  compact?: boolean;
};

export default function ChatBot({
  className = "h-[calc(100vh-72px)]",
  compact = false,
}: ChatBotProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const nextId = useRef(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [chat, { isLoading }] = useAiChatMutation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [question]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", content: trimmed },
    ]);
    setQuestion("");

    try {
      const data = await chat({ question: trimmed }).unwrap();
      const reply = parseReply(data);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", ...reply },
      ]);
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "assistant",
          content: "Something went wrong while fetching the answer. Please try again.",
          isError: true,
        },
      ]);
    }
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(question);
    }
  };

  return (
    <div className={`flex w-full flex-col bg-white ${className}`}>
      {/* TOP BAR */}
      {messages.length > 0 && (
        <div className="flex w-full items-center justify-between border-b border-slate-200 px-6 py-3 lg:px-10">
          <p className="text-sm font-semibold text-slate-600">
            {messages.filter((m) => m.role === "user").length} question
            {messages.filter((m) => m.role === "user").length === 1 ? "" : "s"}{" "}
            this session
          </p>
          <button
            type="button"
            onClick={() => setMessages([])}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-600 transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={15} />
            Clear chat
          </button>
        </div>
      )}

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex min-h-full w-full flex-col items-center justify-center px-6 py-12 text-center lg:px-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
              <ShieldCheck size={28} />
            </span>

            <h1
              className={`${jakarta.className} mt-8 font-extrabold tracking-tight text-slate-950 ${
                compact ? "text-3xl" : "text-4xl sm:text-5xl lg:text-6xl"
              }`}
            >
              How can I help you <span className="text-blue-600">today?</span>
            </h1>
            <p className={`mt-5 max-w-3xl leading-8 text-slate-600 ${
                compact ? "text-base" : "text-lg"
              }`}>
              Ask about rules, circulars and office orders. Every answer is
              based on approved documents.
            </p>

            <div className={`grid w-full gap-4 ${
                compact ? "mt-8 max-w-xl" : "mt-12 max-w-5xl md:grid-cols-3"
              }`}>
              {suggestions.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.text}
                    type="button"
                    onClick={() => send(s.text)}
                    className="group flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={19} />
                    </span>
                    <span className="text-sm font-medium leading-6 text-slate-700">
                      {s.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex items-start justify-end gap-3">
                  <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-blue-600 px-5 py-3.5 text-[15px] leading-7 text-white shadow-sm shadow-blue-600/20">
                    {m.content}
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <User size={17} />
                  </span>
                </div>
              ) : (
                <div key={m.id} className="flex items-start gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      m.isError
                        ? "bg-red-50 text-red-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {m.isError ? <AlertCircle size={17} /> : <Sparkles size={17} />}
                  </span>

                  <div className="max-w-[85%]">
                    <div
                      className={`whitespace-pre-wrap rounded-2xl rounded-tl-md border px-5 py-3.5 text-[15px] leading-7 ${
                        m.isError
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-slate-200 bg-white text-slate-800 shadow-sm"
                      }`}
                    >
                      {m.isError ? (
                        m.content
                      ) : (
                        <div className="prose prose-slate max-w-none break-words prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-li:my-0 prose-a:text-blue-700">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>

                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                          <Quote size={13} />
                          Sources
                        </span>
                        {m.sources.map((src) => (
                          <span
                            key={src}
                            className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                          >
                            {src}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            {isLoading && (
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Sparkles size={17} />
                </span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="w-full border-t border-slate-200 bg-white px-6 pb-5 pt-4 lg:px-10">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-5xl items-end gap-3 rounded-2xl border border-slate-300 bg-white p-2.5 shadow-sm transition focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-600/10"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about government rules, circulars or orders..."
            aria-label="Ask a question"
            className="max-h-[180px] flex-1 resize-none bg-transparent px-3 py-2.5 text-base leading-6 text-slate-900 outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            aria-label="Send question"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            <ArrowUp size={20} />
          </button>
        </form>

        <p className="mx-auto mt-3 w-full max-w-5xl text-center text-xs text-slate-500">
          AI can make mistakes. Verify answers against the source documents
          before taking action.
        </p>
      </div>
    </div>
  );
}