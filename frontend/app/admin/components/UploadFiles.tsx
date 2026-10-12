"use client";

import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Space,
  Upload,
  Input,
} from "antd";

import { useUploadDocumentMutation } from "@/lib/services/documentApi";

const { Dragger } = Upload;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

const UploadFileComponent: React.FC = () => {
  const [uploadDocument, { isLoading }] =
    useUploadDocumentMutation();

  const onFinish = async (values: any) => {
    try {
      const file = values.dragger?.[0]?.originFileObj;

      if (!file) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("file", file);

      const response = await uploadDocument(formData).unwrap();

      console.log("Upload successful:", response);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Form
      name="upload_document"
      {...formItemLayout}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please enter a document title",
          },
        ]}
      >
        <Input placeholder="Enter document title" />
      </Form.Item>

      <Form.Item label="Document">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
          rules={[
            {
              required: true,
              message: "Please select a PDF",
            },
          ]}
        >
          <Dragger
            name="file"
            beforeUpload={() => false}
            maxCount={1}
            accept=".pdf,application/pdf"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>

            <p className="ant-upload-text">
              Click or drag a PDF to this area
            </p>

            <p className="ant-upload-hint">
              Only PDF documents are supported.
            </p>
          </Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item label={null}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Upload
          </Button>

          <Button htmlType="reset">
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UploadFileComponent;
