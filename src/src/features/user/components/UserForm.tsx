"use client";
import { useState } from "react";
import { message } from "antd";
import FormBuilder from "@/components/fragments/builder/FormBuilder";
import { userService } from "@/features/user/services/userService";
import type { CreateUserDto } from "@/features/user/types/user.types";

export default function UserForm() {
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "name",
      label: "User Name",
      type: "text",
      rules: [{ required: true, message: "Please input user name" }],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      rules: [{ required: true, message: "Please input user email" }],
    },
  ];

  const handleSubmit = async (values: CreateUserDto) => {
    setLoading(true);
    try {
      await userService.local.post(values);
      message.success("User created successfully");
    } catch (error: any) {
      message.error(error.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBuilder
      fields={fields}
      onFinish={handleSubmit}
      submitButtonText="Create User"
    />
  );
}
