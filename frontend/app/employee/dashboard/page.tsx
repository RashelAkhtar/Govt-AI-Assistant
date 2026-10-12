"use client";

import { useState } from "react";
import { useAiChatMutation } from "@/lib/services/aiApi";

export default function EmployeeDashboard() {
  const [question, setQuestion] = useState("");

  const [chat, { data, isSuccess, isLoading, isError, error }] = useAiChatMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      // Fix: Wrap question in an object to match ChatDto { question: string }
      await chat({ question }).unwrap();
      setQuestion("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Ask Question</label>
        <textarea
          placeholder="Ask question"
          className="border-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Thinking..." : "Ask"}
        </button>
      </form>

      <div>
        <p>Output: </p>
        {isSuccess && <p>{typeof data === 'string' ? data : JSON.stringify(data)}</p>}
        {isError && <p className="text-red-500">Error sending question</p>}
      </div>
    </div>
  );
}