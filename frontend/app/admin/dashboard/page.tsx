"use client";

import { Button, Flex } from "antd";
import UploadFileComponent from "../components/UploadFiles";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-6 py-8 lg:px-8">
        {/* Welcome */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Administration Portal
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              Dashboard
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage users, government knowledge sources and system activity
              from one place.
            </p>
          </div>

          <Flex gap="small" wrap>
            <Button type="primary">Upload documents</Button>
          </Flex>

          <UploadFileComponent />
        </div>
      </div>
    </div>
  );
}
