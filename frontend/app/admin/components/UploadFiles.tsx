"use client";

import React from "react";
import { Button, Form, Input, Upload, message } from "antd";
import type { UploadFile } from "antd";
import { FileText, UploadCloud } from "lucide-react";
import { useUploadDocumentMutation } from "@/lib/services/documentApi";

const { Dragger } = Upload;

type FormValues = {
  title: string;
  dragger?: UploadFile[];
};

const normFile = (e: UploadFile[] | { fileList?: UploadFile[] }) => {
  if (Array.isArray(e)) return e;
  return e?.fileList;
};

type UploadFileComponentProps = {
  /** Called after a successful upload (e.g. to close a modal). If provided, the parent shows the success message. */
  onSuccess?: () => void;
};

const UploadFileComponent: React.FC<UploadFileComponentProps> = ({
  onSuccess,
}) => {
  const [form] = Form.useForm<FormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

  const onFinish = async (values: FormValues) => {
    const file = values.dragger?.[0]?.originFileObj;

    if (!file) {
      messageApi.error("Please select a PDF to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("file", file);

      await uploadDocument(formData).unwrap();

      form.resetFields();
      if (onSuccess) {
        onSuccess();
      } else {
        messageApi.success("Document uploaded successfully");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      messageApi.error("Upload failed. Please try again.");
    }
  };

  return (
    <>
      {contextHolder}

      <Form<FormValues>
        name="upload_document"
        form={form}
        layout="vertical"
        size="large"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          label={<span className="font-semibold">Document title</span>}
          name="title"
          rules={[
            { required: true, message: "Please enter a document title" },
          ]}
        >
          <Input
            prefix={<FileText size={17} className="text-slate-400" />}
            placeholder="e.g. Service Rules 2024"
            className="!rounded-lg !py-3"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold">PDF file</span>}
          required
          style={{ marginBottom: 0 }}
        >
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[{ required: true, message: "Please select a PDF" }]}
          >
            <Dragger
              name="file"
              beforeUpload={() => false}
              maxCount={1}
              accept=".pdf,application/pdf"
              className="!rounded-2xl !border-slate-300 !bg-slate-50/60 transition hover:!border-blue-500 hover:!bg-blue-50/50"
            >
              <div className="flex flex-col items-center py-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <UploadCloud size={28} />
                </span>
                <p className="mt-4 text-base font-semibold text-slate-900">
                  Click or drag a PDF to this area
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Only PDF documents are supported.
                </p>
              </div>
            </Dragger>
          </Form.Item>
        </Form.Item>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="!h-12 !flex-1 !rounded-xl !border-0 !bg-blue-600 !font-semibold !shadow-lg !shadow-blue-600/25 transition-all duration-200 hover:!-translate-y-0.5 hover:!bg-blue-700 hover:!shadow-xl hover:!shadow-blue-600/30"
          >
            {isLoading ? "Uploading..." : "Upload document"}
          </Button>

          <Button
            htmlType="reset"
            disabled={isLoading}
            onClick={() => form.resetFields()}
            className="!h-12 !rounded-xl !px-8 !font-semibold transition-transform duration-200 hover:!-translate-y-0.5"
          >
            Reset
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UploadFileComponent;