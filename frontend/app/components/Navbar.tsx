"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ShieldCheck } from "lucide-react";
import LogoutButton from "./LogoutButton";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

type WorkspaceHeaderProps = {
  label: string;
  homeHref?: string;
  userName: string;
  userRole: string;
  initial: string;
};

function WorkspaceHeader({
  label,
  homeHref,
  userName,
  userRole,
  initial,
}: WorkspaceHeaderProps) {
  const brand = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30 transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-blue-700">
        <ShieldCheck size={21} />
      </span>
      <span className="leading-tight">
        <span
          className={`${jakarta.className} block text-lg font-extrabold tracking-tight text-slate-950`}
        >
          GOVASSIST
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600">
          {label}
        </span>
      </span>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-[72px] w-full items-center justify-between px-6 lg:px-10">
        {homeHref ? (
          <Link href={homeHref} className="group flex items-center gap-3">
            {brand}
          </Link>
        ) : (
          <div className="group flex items-center gap-3">{brand}</div>
        )}

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
              {initial}
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-slate-900">
                {userName}
              </span>
              <span className="block text-xs text-slate-500">{userRole}</span>
            </span>
          </div>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return (
      <WorkspaceHeader
        label="Administration"
        userName="Administrator"
        userRole="System Admin"
        initial="A"
      />
    );
  }

  if (pathname?.startsWith("/employee")) {
    return (
      <WorkspaceHeader
        label="Employee Workspace"
        homeHref="/employee/dashboard"
        userName="Employee"
        userRole="Authorised User"
        initial="E"
      />
    );
  }

  return null;
}