"use client";
import { useEffect, useState } from "react";
import { userService } from "@/features/user/services/userService";
import type { ColumnsType } from "antd/es/table";
import Button from "@/components/ui/Button";
import { Input } from "antd";
import { TableBuilder } from "@/components/fragments/builder/TableBuilder";
import { EditOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { User } from "@/types/data/user.types";
type EditableUser = User & { isNew?: boolean };

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<EditableUser[]>([]);
  const [count, setCount] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await userService.local.getAll(); // AxiosResponse<User[]>
            setUsers(res.data.data);
            setDataSource(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (id: number, field: keyof User, value: string) => {
    const updated = dataSource.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setDataSource(updated);
  };

  const handleAdd = () => {
    const newData: EditableUser = {
      id: count,
      name: "",
      email: "",
      isNew: true,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = async () => {
    const newUsers = dataSource.filter((s) => s.isNew && s.name.trim() !== "" && s.email.trim() !== "");

    try {
      setLoading(true);
      for (const user of newUsers) {
        await userService.local.post({
          name: user.name,
          email: user.email
        });
      }
      await fetchUsers();
    } catch (err: any) {
      console.error("Gagal menyimpan data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode((prev) => !prev);
  };

  const columns: ColumnsType<EditableUser> = [
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
            placeholder="Masukkan nama user"
            onChange={(e) =>
              handleInputChange(record.id, "name", e.target.value)
            }
          />
        ) : (
          record.name
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_value, record) =>
        record.isNew || isEditMode ? (
          <Input
            value={record.email}
            placeholder="Masukkan email user"
            onChange={(e) =>
              handleInputChange(record.id, "email", e.target.value)
            }
          />
        ) : (
          record.email
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex w-full gap-x-4  justify-end">
        <Button onClick={handleAdd} type="primary" icon={<PlusOutlined />}>
          Add User
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
