"use client";

import React from "react";
import Link from "next/link";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoginEmployeeMutation } from "@/lib/services/authApi";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

type FieldType = {
  email: string;
  password: string;
};

// Demo accounts: remove this block before going to production.
const demoAccounts = [
  {
    label: "Admin",
    icon: UserCog,
    email: "admin@gmail.com",
    password: "admin@123",
  },
  {
    label: "Employee",
    icon: Users,
    email: "employee@gmail.com",
    password: "employee@123",
  },
];

const highlights = [
  "Source-grounded answers",
  "Role-based access",
  "Auditable interactions",
];

const PATTERN = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000' viewBox='0 0 1000 1000'>
    <defs>
      <radialGradient id='a' cx='80%' cy='5%' r='60%'><stop offset='0' stop-color='#2563eb' stop-opacity='0.2'/><stop offset='1' stop-color='#2563eb' stop-opacity='0'/></radialGradient>
      <radialGradient id='b' cx='5%' cy='95%' r='55%'><stop offset='0' stop-color='#60a5fa' stop-opacity='0.22'/><stop offset='1' stop-color='#60a5fa' stop-opacity='0'/></radialGradient>
      <pattern id='g' width='48' height='48' patternUnits='userSpaceOnUse'><path d='M48 0H0V48' fill='none' stroke='#1e40af' stroke-opacity='0.07'/></pattern>
    </defs>
    <rect width='1000' height='1000' fill='white'/>
    <rect width='1000' height='1000' fill='url(#g)'/>
    <rect width='1000' height='1000' fill='url(#a)'/>
    <rect width='1000' height='1000' fill='url(#b)'/>
  </svg>`
);

const LogIn: React.FC = () => {
  const [form] = Form.useForm<FieldType>();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [login, { isLoading }] = useLoginEmployeeMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const result = await login({ ...values }).unwrap();

      messageApi.success("Login successful");
      form.resetFields();

      if (result.role === "Admin") {
        router.replace("/admin/dashboard");
      } else if (result.role === "Employee") {
        router.replace("/employee/dashboard");
      } else {
        messageApi.error("Your account has no access role assigned.");
      }
    } catch {
      messageApi.error("Wrong email or password! Try again");
    }
  };

  return (
    <main
      className={`${inter.className} grid min-h-screen w-full bg-white text-slate-900 antialiased lg:grid-cols-2`}
    >
      {contextHolder}

      {/* LEFT: BRAND PANEL */}
      <section
        className="relative hidden flex-col justify-between overflow-hidden border-r border-slate-200 bg-cover bg-center p-12 lg:flex xl:p-16"
        style={{ backgroundImage: `url("data:image/svg+xml,${PATTERN}")` }}
      >
        <Link
          href="/"
          className={`${jakarta.className} group flex w-fit items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-950`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30 transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-blue-700">
            <ShieldCheck size={22} />
          </span>
          GOVASSIST
        </Link>

        <div>
          <h1
            className={`${jakarta.className} text-5xl font-extrabold leading-[1.08] tracking-tight text-slate-950 xl:text-6xl`}
          >
            Government knowledge,
            <span className="block text-blue-600">answered in seconds.</span>
          </h1>

          <ul className="mt-10 space-y-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-base font-medium text-slate-600"
              >
                <CheckCircle2 size={20} className="text-blue-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-slate-500">
          Designed for authorised users and bounded pilot deployments.
        </p>
      </section>

      {/* RIGHT: FORM */}
      <section className="flex flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
        <Link
          href="/"
          className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back to home
        </Link>

        <div className="flex flex-1 items-center">
          <div className="w-full max-w-xl">
            <div className="mb-3 flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-950 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <ShieldCheck size={20} />
              </span>
              <span className={jakarta.className}>GOVASSIST</span>
            </div>

            <h2
              className={`${jakarta.className} text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl`}
            >
              Welcome back
            </h2>
            <p className="mb-10 mt-3 text-lg text-slate-600">
              Sign in to access the knowledge assistant.
            </p>

            <Form
              name="login"
              form={form}
              layout="vertical"
              size="large"
              requiredMark={false}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label={<span className="font-semibold">Email</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Enter a valid email",
                  },
                ]}
              >
                <Input
                  prefix={<Mail size={17} className="text-slate-400" />}
                  placeholder="you@department.gov.in"
                  className="!rounded-lg !py-3"
                />
              </Form.Item>

              <Form.Item<FieldType>
                label={<span className="font-semibold">Password</span>}
                name="password"
                rules={[{ required: true, message: "Input your password!" }]}
              >
                <Input.Password
                  prefix={<LockKeyhole size={17} className="text-slate-400" />}
                  placeholder="Enter your password"
                  className="!rounded-lg !py-3"
                />
              </Form.Item>

              <Form.Item className="!mb-0 !mt-8">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                  className="!h-14 !rounded-xl !border-0 !bg-blue-600 !text-base !font-semibold !shadow-lg !shadow-blue-600/25 transition-all duration-200 hover:!-translate-y-1 hover:!bg-blue-700 hover:!shadow-xl hover:!shadow-blue-600/30"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </Form.Item>
            </Form>

            {/* DEMO ACCOUNTS */}
            <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                Demo accounts
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Click an account to fill in the credentials.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {demoAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <button
                      key={account.label}
                      type="button"
                      onClick={() =>
                        form.setFieldsValue({
                          email: account.email,
                          password: account.password,
                        })
                      }
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition duration-200 group-hover:bg-blue-600 group-hover:text-white">
                        <Icon size={19} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-slate-900">
                          {account.label}
                        </span>
                        <span className="block truncate text-xs text-slate-500">
                          {account.email}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LogIn;