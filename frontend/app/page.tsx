"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  Brain,
  Quote,
  LockKeyhole,
  History,
  Database,
  Users,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const capabilities = [
  {
    icon: Search,
    title: "Authoritative Search",
    description:
      "Find relevant rules, circulars, office orders, precedents and approved government documents from a single knowledge interface.",
  },
  {
    icon: Quote,
    title: "Traceable Answers",
    description:
      "Every generated response can be linked back to the underlying approved source so officials can verify the information.",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description:
      "Summarise documents, extract structured information and identify relevant sections without manually reviewing every page.",
  },
  {
    icon: Brain,
    title: "Drafting Assistance",
    description:
      "Assist with routine notes, orders and procedural drafts while keeping the final decision and approval with the authorised official.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Control access to knowledge, documents and workflows according to the role and authority of each user.",
  },
  {
    icon: History,
    title: "Audit & Traceability",
    description:
      "Maintain an auditable record of queries, generated outputs, sources and knowledge-base changes.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Ask",
    description:
      "An authorised official asks a procedural question or requests assistance with a government document.",
  },
  {
    number: "02",
    title: "Retrieve",
    description:
      "The system searches approved government knowledge sources and identifies relevant documents and passages.",
  },
  {
    number: "03",
    title: "Generate",
    description:
      "The assistant generates a response, summary, extraction or draft grounded in the retrieved sources.",
  },
  {
    number: "04",
    title: "Verify",
    description:
      "The official reviews the answer and its source references before using or approving the output.",
  },
];

const principles = [
  "Authorised users only",
  "Approved knowledge sources",
  "Source-grounded responses",
  "Human review before action",
  "Auditable interactions",
  "Government-controlled data",
];

export default function Home() {
  return (
    <main className="min-h-100 bg-[#f7f9fc] text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.08),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Secure • Source-Grounded • Human-Controlled
            </div>

            <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Government knowledge,
              <span className="block text-blue-700">
                available when officials need it.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              A secure AI assistant for authorised government officials to
              search approved knowledge, understand documents, answer routine
              procedural questions and prepare drafts — with every output
              traceable to its source.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Access Assistant
                <ArrowRight size={17} />
              </Link>

              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore Capabilities
                <ChevronRight size={17} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600" />
                Approved sources
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600" />
                Role-based access
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600" />
                Human verification
              </span>
            </div>
          </div>

          {/* HERO PRODUCT PANEL */}
          <div className="flex items-center">
            <div className="w-full rounded-2xl border border-slate-200 bg-slate-950 p-3 shadow-2xl shadow-slate-300/30">
              <div className="rounded-xl bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Government Knowledge Assistant
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Authorised workspace
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Secure
                  </div>
                </div>

                <div className="space-y-5 p-5">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      QUERY
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">
                      What procedure applies when processing a service-related
                      administrative request?
                    </p>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                        <Brain size={15} />
                      </div>
                      <p className="text-xs font-semibold text-slate-500">
                        GROUNDED RESPONSE
                      </p>
                    </div>

                    <p className="text-sm leading-6 text-slate-700">
                      The applicable procedure is based on the relevant service
                      rules and the competent authority&apos;s approval
                      requirements. The following approved documents contain
                      the relevant provisions...
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                    <div className="flex items-start gap-3">
                      <Quote
                        size={16}
                        className="mt-0.5 shrink-0 text-blue-700"
                      />

                      <div>
                        <p className="text-xs font-bold text-blue-900">
                          SOURCES
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-800">
                          Office Order • Service Rules • Administrative
                          Circular
                        </p>

                        <button className="mt-2 text-xs font-semibold text-blue-700 hover:underline">
                          View source passages →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                The challenge
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                From scattered information to a trusted first response.
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-8 text-slate-600">
                Officials often need to search across manuals, circulars,
                precedents, portals and documents before they can answer a
                routine procedural question or prepare a draft.
              </p>

              <p className="text-lg leading-8 text-slate-600">
                GOVASSIST brings approved government knowledge into one secure
                interface while preserving the ability to verify where an
                answer came from.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <Database className="text-blue-700" size={22} />
                  <p className="mt-4 text-sm font-bold text-slate-900">
                    One knowledge layer
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Approved sources made easier to find.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <Quote className="text-blue-700" size={22} />
                  <p className="mt-4 text-sm font-bold text-slate-900">
                    Visible evidence
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Answers remain connected to source material.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <Users className="text-blue-700" size={22} />
                  <p className="mt-4 text-sm font-bold text-slate-900">
                    Official remains in control
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    AI assists; authorised officials decide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Capabilities
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Built around real government workflows.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              The assistant is designed to reduce repetitive information
              handling without removing the official from the decision-making
              process.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Retrieval first. Generation second. Verification always.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              The system is designed to ground generated responses in
              approved source material before presenting them to an official.
            </p>
          </div>

          <div className="mt-14 grid gap-0 border-l border-slate-700 md:grid-cols-4 md:border-l-0">
            {workflow.map((item, index) => (
              <div
                key={item.number}
                className={`relative border-b border-slate-800 p-7 md:border-b-0 ${
                  index !== workflow.length - 1
                    ? "md:border-r md:border-slate-800"
                    : ""
                }`}
              >
                <span className="text-sm font-bold text-blue-400">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                <LockKeyhole size={23} />
              </div>

              <h2 className="mt-7 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Designed for controlled government use.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Security and traceability are part of the workflow rather than
                features added after the AI system is built.
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Pilot deployments can be limited to clearly bounded,
                non-sensitive datasets and expanded only after appropriate
                validation, security and compliance review.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {principles.map((principle) => (
                  <div
                    key={principle}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-emerald-600"
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      {principle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HUMAN CONTROL */}
      <section className="bg-blue-50">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white">
            <Users size={23} />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            AI assists. Officials decide.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            GOVASSIST is designed as a decision-support and knowledge
            retrieval system, not an autonomous decision-maker. Generated
            outputs remain subject to review, verification and approval by
            authorised officials.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
              Source-grounded
            </span>
            <span className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
              Human reviewed
            </span>
            <span className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
              Auditable
            </span>
            <span className="rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
              Role controlled
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Pilot access
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Put approved government knowledge within reach.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Access the secure assistant and explore how source-grounded AI
                can support routine government workflows.
              </p>
            </div>

            <Link
              href="/auth"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Sign in to continue
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span>Government Knowledge Assistant</span>
          </div>

          <p>
            Designed for authorised users and bounded pilot deployments.
          </p>
        </div>
      </footer>
    </main>
  );
}