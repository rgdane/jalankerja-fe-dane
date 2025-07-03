"use client";
import { useEffect, useState } from "react";
import { TableBuilder } from "@/components/fragments/builder/TableBuilder";
import { useProjectAction } from "../hook/useProject";
import { Project } from "@/types/data/project.types";
import { formatDate } from "@/lib/formatDate";

export default function ProjectList() {
  const { fetchProjects, createProject, deleteProject, updateProject } =
    useProjectAction();
  const [project, setProject] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDatas = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      console.log(data);
      setProject(data);
    } catch (error) {
      console.error("Failed to load datas:", error);
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

  const columns = [
    {
      key: "nama",
      title: "Name",
      dataIndex: "nama",
      editable: true,
      placeholder: "Masukkan nama project",
    },
    {
      key: "kode",
      title: "Kode",
      dataIndex: "kode",
      editable: true,
      placeholder: "Masukkan kode",
    },
    {
      key: "deskripsi",
      title: "Deskripsi",
      dataIndex: "deskripsi",
      editable: true,
      placeholder: "Masukkan deskripsi",
    },
    {
      key: "start_date",
      title: "Tanggal Mulai",
      dataIndex: "start_date",
      editable: true,
      placeholder: "Masukkan tanggal mulai",
      render: (_: any, record: any) => formatDate(record.start_date),
    },
    {
      key: "end_date",
      title: "Tanggal Selesai",
      dataIndex: "end_date",
      editable: true,
      placeholder: "Masukkan tanggal berakhir",
      render: (_: any, record: any) => formatDate(record.end_date),
    },
  ];

  return (
    <TableBuilder<Project>
      datas={project}
      columns={columns}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      addButtonText="Add Project"
      deleteConfirmTitle="Hapus Project ini?"
      emptyRecord={{ nama: "" }}
    />
  );
}
