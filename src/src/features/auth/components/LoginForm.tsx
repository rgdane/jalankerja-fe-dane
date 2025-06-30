"use client";

import {
  MailOutlined,
  KeyOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import FormBuilder from "@/components/fragments/builder/FormBuilder";
import { FormProps } from "@/types/props/form";
import { useNotify } from "@/components/providers/NotificationProvider";
import { useAuthService } from "@/features/auth/services/authService";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [api] = useNotify();
  const { local } = useAuthService();
  const router = useRouter();

  const fields: FormProps[] = [
    {
      name: "email",
      type: "input",
      rules: [{ required: true, message: "Please input your email!" }],
      props: {
        size: "large",
        placeholder: "Email",
        prefix: <MailOutlined style={{ color: "#1890FF" }} />,
      },
    },
    {
      name: "password",
      type: "password",
      rules: [{ required: true, message: "Please input your password!" }],
      props: {
        size: "large",
        placeholder: "Password",
        prefix: <KeyOutlined style={{ color: "#1890FF" }} />,
        iconRender: (visible: boolean) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
      },
    },
    {
      name: "remember",
      type: "checkbox",
      valuePropName: "checked",
      label: "Remember me",
    },
  ];

  const handleSubmit = async (values: any) => {
    try {
      const res = await local.post({
        email: values.email,
        password: values.password,
      });

      api.success({
        message: "Login Berhasil",
        description: `Selamat datang, ${res.data.user.name}`,
      });

      router.push("/dashboard");
    } catch (err: any) {
      api.error({
        message: "Login Gagal",
        description: err.message ?? "Terjadi kesalahan.",
      });
    }
  };

  return (
    <FormBuilder
      fields={fields}
      onFinish={handleSubmit}
      initialValues={{ remember: true }}
      submitButtonText="Sign In"
    />
  );
};
