"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <ShieldCheck size={22} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-slate-950">
                GOVASSIST
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Government Knowledge Assistant
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#capabilities"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Capabilities
            </a>
            <a
              href="#workflow"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              How It Works
            </a>
            <a
              href="#security"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Security
            </a>
          </nav>

          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Authorised Access
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>
    );
  }

  if (pathname?.startsWith("/admin")) {
    return (
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Administration
            </p>
            <h1 className="text-lg font-bold tracking-tight text-slate-950">
              Government Knowledge Assistant
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-slate-200" />

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                A
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  Administrator
                </p>
                <p className="text-xs text-slate-500">System Admin</p>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>
    );
  }

  if (pathname?.startsWith("/employee")) {
    return (
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6 lg:px-8">
          <Link href="/employee/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <ShieldCheck size={19} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-slate-950">
                Government Knowledge Assistant
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Employee Workspace
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-slate-200" />

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                E
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">Employee</p>
                <p className="text-xs text-slate-500">Authorised User</p>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>
      </header>
    );
  }
}
