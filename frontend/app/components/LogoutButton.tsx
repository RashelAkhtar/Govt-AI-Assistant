import { useLogoutMutation } from "@/lib/services/authApi";
import { Button, Flex, message } from "antd";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      message.open({
        type: "success",
        content: "Logout successful",
      });

      router.push("/auth");
    } catch {
      messageApi.open({
        type: "error",
        content: "Logout fail",
      });
    }
  };

  return (
    <div>
      {contextHolder}

      <Flex wrap gap="large">
        <Button
          type="primary"
          danger
          onClick={handleLogout}
          loading={isLoading}
        >
          {isLoading ? "Logging out..." : "Log Out"}
        </Button>
      </Flex>
    </div>
  );
}
