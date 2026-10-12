"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { useLoginEmployeeMutation } from "@/lib/services/authApi";
import { useRouter } from "next/navigation";

type FieldType = {
  email: string;
  password: string;
};

const LogIn: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  const [login, {isLoading}] = useLoginEmployeeMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const result = await login({ ...values }).unwrap();

      messageApi.open({
        type: "success",
        content: "Login successful",
      });

      form.resetFields();

      if (result.role === "Admin") {
      router.replace("/admin/dashboard");
    } else if (result.role === "Employee") {
      router.replace("/employee/dashboard");
    }
    } catch {
      messageApi.open({
        type: "error",
        content: "Wrong email or password! Try again",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h2 className="text-2xl font-semibold text-gray-900">LogIn</h2>

        <p className="mb-6 text-sm text-gray-500">Welcome back</p>

        <Form name="basic" form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Enter a valid email",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Input your password!",
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {contextHolder}
    </div>
  );
};

export default LogIn;
