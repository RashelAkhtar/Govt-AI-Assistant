"use client";

import Link from "next/link";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  Quote,
  History,
  Upload,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const capabilities = [
  {
    icon: Search,
    title: "Authoritative Search",
    description:
      "Find rules, circulars, office orders and approved documents through a single, simple question box.",
  },
  {
    icon: Quote,
    title: "Traceable Answers",
    description:
      "Every response links back to the approved source passage so officials can verify it instantly.",
  },
  {
    icon: Upload,
    title: "Admin Document Management",
    description:
      "Administrators upload and maintain the approved knowledge base that powers every answer.",
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    description:
      "Summarise long documents and pull out the relevant sections without reading every page.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Control who can see which documents and workflows based on role and authority.",
  },
  {
    icon: History,
    title: "Audit Trail",
    description:
      "Queries, answers, sources and knowledge-base changes are recorded for accountability.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Upload",
    description: "Admins add approved government documents to the knowledge base.",
  },
  {
    number: "02",
    title: "Ask",
    description: "Employees ask procedural questions in plain language.",
  },
  {
    number: "03",
    title: "Retrieve",
    description: "The system finds the most relevant passages from approved sources.",
  },
  {
    number: "04",
    title: "Verify",
    description: "Answers come with source references, ready for human review.",
  },
];

export default function Home() {
  return (
    <main
      className={`${inter.className} min-h-screen w-full bg-white text-slate-900 antialiased`}
    >
      {/* HERO */}
      <section className="w-full bg-white">
        <div className="flex w-full flex-col items-center px-6 pb-28 pt-24 text-center lg:px-16 lg:pb-36 lg:pt-32 xl:px-24">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Secure AI Knowledge Assistant for Government
          </div>

          <h1
            className={`${jakarta.className} w-full text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl`}
          >
            Government knowledge,
            <span className="block text-blue-600">
              answered in seconds.
            </span>
          </h1>

          <p className="mt-8 w-full max-w-5xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Administrators upload approved documents. Employees ask questions
            in plain language and receive accurate answers, each one traceable
            to its source.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/auth"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-200 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#capabilities"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-8 py-4 text-base font-semibold text-blue-700 transition duration-200 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50"
            >
              Explore Capabilities
              <ChevronRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-500">
            {["Approved sources only", "Role-based access", "Human verification"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-blue-600" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section
        id="capabilities"
        className="w-full border-t border-slate-200 bg-white"
      >
        <div className="w-full px-6 py-24 lg:px-16 xl:px-24">
          <div className="w-full text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Capabilities
            </p>
            <h2
              className={`${jakarta.className} mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl`}
            >
              Everything officials need, nothing they don&apos;t.
            </h2>
          </div>

          <div className="mt-16 grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3
                    className={`${jakarta.className} mt-6 text-xl font-bold text-slate-950`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="w-full border-t border-slate-200 bg-white"
      >
        <div className="w-full px-6 py-24 lg:px-16 xl:px-24">
          <div className="w-full text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              How it works
            </p>
            <h2
              className={`${jakarta.className} mt-4 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl`}
            >
              Retrieve first. Generate second. Verify always.
            </h2>
          </div>

          <div className="mt-16 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item) => (
              <div
                key={item.number}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
              >
                <span
                  className={`${jakarta.className} text-4xl font-extrabold text-blue-600/30 transition group-hover:text-blue-600`}
                >
                  {item.number}
                </span>
                <h3
                  className={`${jakarta.className} mt-4 text-2xl font-bold text-slate-950`}
                >
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t border-slate-200 bg-white">
        <div className="flex w-full flex-col items-center px-6 py-24 text-center lg:px-16 xl:px-24">
          <h2
            className={`${jakarta.className} w-full text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl`}
          >
            AI assists. <span className="text-blue-600">Officials decide.</span>
          </h2>
          <p className="mt-6 w-full max-w-4xl text-lg leading-8 text-slate-600">
            Sign in to search approved knowledge and get source-backed answers
            for your everyday work.
          </p>
          <Link
            href="/auth"
            className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-9 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-200 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
          >
            Sign in to continue
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-200 bg-white">
        <div className="flex w-full flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-16 xl:px-24">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <ShieldCheck size={17} className="text-blue-600" />
            GOVASSIST
          </div>
          <p>Designed for authorised users and bounded pilot deployments.</p>
        </div>
      </footer>
    </main>
  );
}