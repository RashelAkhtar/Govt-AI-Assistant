"use client";

import { useLogoutMutation } from "@/lib/services/authApi";
import { Button, message } from "antd";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      messageApi.success("Logged out successfully");
      router.replace("/auth");
      router.refresh();
    } catch {
      messageApi.error("Logout failed. Please try again.");
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        danger
        size="large"
        onClick={handleLogout}
        loading={isLoading}
        disabled={isLoading}
        icon={!isLoading ? <LogOut size={16} /> : undefined}
        className="!inline-flex !items-center !gap-1 !rounded-lg !font-semibold transition-transform duration-200 hover:-translate-y-0.5"
      >
        {isLoading ? "Logging out..." : "Log out"}
      </Button>
    </>
  );
}