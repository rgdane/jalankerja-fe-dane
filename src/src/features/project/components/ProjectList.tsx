"use client";
import { useEffect, useState } from "react";
import { projectService } from "@/features/project/services/projectService";
import type { ColumnsType } from "antd/es/table";
import Button from "@/components/ui/Button";
import { Input } from "antd";
import { TableBuilder } from "@/components/fragments/builder/TableBuilder";
import { EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Project } from "@/types/data/project.types";
type EditableProject = Project & { isNew?: boolean };

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<EditableProject[]>([]);
  const [count, setCount] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await projectService.local.getAll(); // AxiosResponse<Project[]>
            setProjects(res.data.data);
            setDataSource(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (id: number, field: keyof Project, value: string) => {
    const updated = dataSource.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setDataSource(updated);
  };

  const handleAdd = () => {
    const newData: EditableProject = {
      id: count,
      name: "",
      code: "",
      description: "",
      start_date: "",
      end_date: "",
      isNew: true,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = async () => {
    const newProjects = dataSource.filter((s) => s.isNew && s.name.trim() !== "" && s.code.trim() !== "");

    try {
      setLoading(true);
      for (const project of newProjects) {
        await projectService.local.post({
          name: project.name,
          code: project.code,
          description: project.description,
          startDate: project.start_date,
          endDate: project.end_date,
        });
      }
      await fetchProjects();
    } catch (err: any) {
      console.error("Gagal menyimpan data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode((prev) => !prev);
  };

  const columns: ColumnsType<EditableProject> = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_value, record) =>
        record.isNew || isEditMode ? (
          <Input
            value={record.name}
            placeholder="Masukkan nama project"
            onChange={(e) =>
              handleInputChange(record.id, "name", e.target.value)
            }
          />
        ) : (
          record.name
        ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (_value, record) =>
        record.isNew || isEditMode ? (
          <Input
            value={record.code}
            placeholder="Masukkan code project"
            onChange={(e) =>
              handleInputChange(record.id, "code", e.target.value)
            }
          />
        ) : (
          record.code
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_value, record) =>
        record.isNew || isEditMode ? (
          <Input
            value={record.description}
            placeholder="Masukkan deskripsi project"
            onChange={(e) =>
              handleInputChange(record.id, "description", e.target.value)
            }
          />
        ) : (
          record.description
        ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (_value, record) =>
        record.isNew || isEditMode ? (
          <Input
            value={record.start_date}
            placeholder="Masukkan tanggal mulai project"
            onChange={(e) =>
              handleInputChange(record.id, "start_date", e.target.value)
            }
          />
        ) : (
          record.start_date?.split('T')[0]
        ),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (_value, record) =>
        record.isNew || isEditMode ? (
          <Input
            value={record.end_date}
            placeholder="Masukkan tanggal selesai project"
            onChange={(e) =>
              handleInputChange(record.id, "end_date", e.target.value)
            }
          />
        ) : (
          record.end_date?.split('T')[0]
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex w-full gap-x-4  justify-end">
        <Button onClick={handleAdd} type="primary" icon={<PlusOutlined />}>
          Add Project
        </Button>
        <Button onClick={handleEdit} icon={<EditOutlined />}>
          Edit
        </Button>
        <Button onClick={handleSave} icon={<SaveOutlined />}>
          Save
        </Button>
      </div>
      <div className="shadow-xs  ">
        <TableBuilder
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </div>
    </div>
  );
}
