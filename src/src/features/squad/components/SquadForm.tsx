"use client";
import { useState } from "react";
import { message } from "antd";
import FormBuilder from "@/components/fragments/builder/FormBuilder";
import { squadService } from "@/features/squad/services/squadService";
import type { CreateSquadDto } from "@/features/squad/types/squad.types";

export default function SquadForm() {
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "name",
      label: "Squad Name",
      type: "text",
      rules: [{ required: true, message: "Please input squad name" }],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
    },
  ];

  const handleSubmit = async (values: CreateSquadDto) => {
    setLoading(true);
    try {
      await squadService.local.post(values);
      message.success("Squad created successfully");
    } catch (error: any) {
      message.error(error.message || "Failed to create squad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBuilder
      fields={fields}
      onFinish={handleSubmit}
      submitButtonText="Create Squad"
    />
  );
}
