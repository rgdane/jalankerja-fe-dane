"use client";
import { useEffect, useState } from "react";
import { useProjectActions } from "../hook/useProject";
import { TableBuilder } from "@/components/fragments/builder/TableBuilder";
import { Project } from "@/types/data/project.types";

export default function ProjectList() {
  const { fetchProjects, createProject, deleteProject, updateProject } =
    useProjectActions();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDatas = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      console.log(data);
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatas();
  }, []);

  const handleCreate = async (data: Omit<Project, "id">) => {
    await createProject(data);
    await loadDatas(); // Refresh data
  };

  const handleUpdate = async (id: number, data: Partial<Project>) => {
    await updateProject(id, data);
    await loadDatas(); // Refresh data
  };

  const handleDelete = async (id: number) => {
    await deleteProject(id);
    await loadDatas(); // Refresh data
  };

  const projectColumns = [
    {
      key: "name",
      title: "Nama",
      dataIndex: "name",
      editable: true,
      placeholder: "Masukkan nama project",
    },
    {
      key: "code",
      title: "Kode",
      dataIndex: "code",
      editable: true,
      placeholder: "Masukkan kode project",
    },
    {
      key: "description",
      title: "Deskripsi",
      dataIndex: "description",
      editable: true,
      placeholder: "Masukkan deskripsi project",
    },
    {
      key: "start_date",
      title: "Tanggal Mulai",
      dataIndex: "start_date",
      editable: true,
      placeholder: "Masukkan tanggal mulai project",
    },
    {
      key: "end_date",
      title: "Tanggal Selesai",
      dataIndex: "end_date",
      editable: true,
      placeholder: "Masukkan tanggal selesai project",
    },
  ];

  return (
    <TableBuilder<Project>
      datas={projects}
      columns={projectColumns}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      addButtonText="Add Project"
      deleteConfirmTitle="Hapus project ini?"
      emptyRecord={{
        name: "",
        code: "",
        description: "",
        start_date: "",
        end_date: "",
      }}
    />
  );
}
