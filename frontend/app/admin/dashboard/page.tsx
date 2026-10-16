"use client";

import { useState } from "react";
import { Modal, message } from "antd";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MessagesSquare, Upload, UploadCloud } from "lucide-react";
import UploadFileComponent from "../components/UploadFiles";
import ChatBot from "@/app/components/Chatbot";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export default function AdminDashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleUploadSuccess = () => {
    setIsUploadOpen(false);
    messageApi.success("Document uploaded successfully");
  };

  return (
    <main className="min-h-[calc(100vh-72px)] w-full bg-white text-slate-900">
      {contextHolder}

      <div className="w-full px-6 py-10 lg:px-10 xl:px-16">
        {/* HEADER */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Administration Portal
            </p>
            <h1
              className={`${jakarta.className} mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl`}
            >
              Dashboard
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Upload approved documents to the knowledge base, then test how
              the assistant answers from them.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-200 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
          >
            <Upload
              size={18}
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            />
            Upload document
          </button>
        </div>

        {/* TEST ASSISTANT */}
        <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-4 border-b border-slate-200 px-8 py-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MessagesSquare size={23} />
            </span>
            <div>
              <h2
                className={`${jakarta.className} text-xl font-bold text-slate-950`}
              >
                Test the assistant
              </h2>
              <p className="text-sm text-slate-500">
                Ask a question to check answers from uploaded documents.
              </p>
            </div>
          </div>

          <ChatBot compact className="h-[calc(100vh-380px)] min-h-[520px]" />
        </section>
      </div>

      {/* UPLOAD MODAL */}
      <Modal
        open={isUploadOpen}
        onCancel={() => setIsUploadOpen(false)}
        footer={null}
        centered
        width={640}
        destroyOnHidden
        mask={{ closable: false }}
        title={
          <div className="flex items-center gap-4 pb-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UploadCloud size={23} />
            </span>
            <div>
              <h2
                className={`${jakarta.className} text-xl font-bold text-slate-950`}
              >
                Upload document
              </h2>
              <p className="text-sm font-normal text-slate-500">
                Add a PDF to the approved knowledge base.
              </p>
            </div>
          </div>
        }
      >
        <div className="pt-4">
          <UploadFileComponent onSuccess={handleUploadSuccess} />
        </div>
      </Modal>
    </main>
  );
}