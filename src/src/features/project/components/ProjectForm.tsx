"use client";
import { useState } from "react";
import { message } from "antd";
import FormBuilder from "@/components/fragments/builder/FormBuilder";
import { projectService } from "@/features/project/services/projectService";
import type { CreateProjectDto } from "@/features/project/types/project.types";

export default function ProjectForm() {
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: "name",
      label: "Project Name",
      type: "text",
      rules: [{ required: true, message: "Please input project name" }],
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      rules: [{ required: true, message: "Please input project code" }],
    },
    {
      name: "description",
      label: "Description",
      type: "description",
      rules: [{ required: true, message: "Please input project description" }],
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      rules: [{ required: true, message: "Please input project start date" }],
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      rules: [{ required: true, message: "Please input project end date" }],
    },
  ];

  const handleSubmit = async (values: CreateProjectDto) => {
    setLoading(true);
    try {
      await projectService.local.post(values);
      message.success("Project created successfully");
    } catch (error: any) {
      message.error(error.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBuilder
      fields={fields}
      onFinish={handleSubmit}
      submitButtonText="Create Project"
    />
  );
}
