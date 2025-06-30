"use client";
import { useEffect, useState } from "react";
import { squadService } from "@/features/squad/services/squadService";
import type { ColumnsType } from "antd/es/table";
import Button from "@/components/ui/Button";
import { Input } from "antd";
import { TableBuilder } from "@/components/fragments/builder/TableBuilder";
import { EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Squad } from "@/types/data/squad.types";
type EditableSquad = Squad & { isNew?: boolean };

export default function SquadList() {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<EditableSquad[]>([]);
  const [count, setCount] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchSquads = async () => {
    setLoading(true);
    try {
      const res = await squadService.local.getAll();
      console.log(res);
      setSquads(res.data);
      setDataSource(res.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSquads();
  }, []);

  const handleInputChange = (id: number, field: keyof Squad, value: string) => {
    const updated = dataSource.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setDataSource(updated);
  };

  const handleAdd = () => {
    const newData: EditableSquad = {
      id: count,
      name: "",
      isNew: true,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = async () => {
    const newSquads = dataSource.filter((s) => s.isNew && s.name.trim() !== "");

    try {
      setLoading(true);
      for (const squad of newSquads) {
        await squadService.local.post({
          Name: squad.name,
          general_project_id: 7,
          anggota: [61],
        });
      }
      await fetchSquads();
    } catch (err: any) {
      console.error("Gagal menyimpan data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode((prev) => !prev);
  };

  const columns: ColumnsType<EditableSquad> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_value, record) =>
        record.isNew || isEditMode ? (
          <Input
            value={record.name}
            placeholder="Masukkan nama squad"
            onChange={(e) =>
              handleInputChange(record.id, "name", e.target.value)
            }
          />
        ) : (
          record.name
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex w-full gap-x-4  justify-end">
        <Button onClick={handleAdd} type="primary" icon={<PlusOutlined />}>
          Add Squad
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
