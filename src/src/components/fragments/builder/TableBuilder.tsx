"use client";

import { useEffect, useState } from "react";
import { Input, Popconfirm, message } from "antd";
import Button from "@/components/ui/Button";
import { Table } from "antd";
import {
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

export interface BaseRecord {
  id: number;
  [key: string]: any;
}

export interface EditableRecord extends BaseRecord {
  isNew?: boolean;
  tempId: number;
}

export interface TableBuilderProps<T extends BaseRecord> {
  datas: T[];
  columns: Array<{
    key: string;
    title: string;
    dataIndex?: string;
    editable?: boolean;
    inputType?: "text" | "number" | "select";
    placeholder?: string;
    options?: Array<{ label: string; value: any }>;
  }>;
  onCreate: (data: Omit<T, "id">) => Promise<void>;
  onUpdate: (id: number, data: Partial<T>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
  addButtonText?: string;
  deleteConfirmTitle?: string;
  emptyRecord?: Partial<T>;
}

export function TableBuilder<T extends BaseRecord>({
  datas,
  columns,
  onCreate,
  onUpdate,
  onDelete,
  loading = false,
  addButtonText = "Add New",
  deleteConfirmTitle = "Delete this record?",
  emptyRecord = {} as Partial<T>,
}: TableBuilderProps<T>) {
  const [messageApi, messageContext] = message.useMessage();
  const [dataSource, setDataSource] = useState<Array<EditableRecord & T>>([]);
  const [editingIds, setEditingIds] = useState<number[]>([]);
  const [tempCounter, setTempCounter] = useState(1);

  useEffect(() => {
    setDataSource(
      datas.map((item, index) => ({
        ...item,
        tempId: item.id || index + 1,
      }))
    );
    setTempCounter(Math.max(...datas.map((d) => d.id || 0)) + 1);
  }, [datas]);

  const handleInputChange = (tempId: number, field: keyof T, value: any) => {
    setDataSource((prev) =>
      prev.map((row) =>
        row.tempId === tempId ? { ...row, [field]: value } : row
      )
    );
  };

  const handleAdd = () => {
    const newTempId = tempCounter;
    const newRecord = {
      ...emptyRecord,
      id: 0,
      isNew: true,
      tempId: newTempId,
    } as EditableRecord & T;

    setDataSource((prev) => [...prev, newRecord]);
    setTempCounter((prev) => prev + 1);
    setEditingIds((prev) => [...prev, newTempId]); // multiple editing rows
  };

  const handleRowSave = async (
    record: EditableRecord & T,
    silent = false
  ): Promise<boolean> => {
    try {
      if (record.isNew) {
        const { isNew, tempId, id, ...dataToCreate } = record;
        await onCreate(dataToCreate as Omit<T, "id">);
      } else {
        const { isNew, tempId, ...dataToUpdate } = record;
        await onUpdate(record.id, dataToUpdate as Partial<T>);
      }
      setEditingIds((prev) => prev.filter((id) => id !== record.tempId));
      if (!silent) messageApi.success("Data berhasil disimpan");
      return true;
    } catch (error) {
      if (!silent) messageApi.error("Gagal menyimpan data");
      console.error("Save error:", error);
      return false;
    }
  };

  const handleDelete = async (record: EditableRecord & T) => {
    try {
      if (record.isNew) {
        setDataSource((prev) =>
          prev.filter((item) => item.tempId !== record.tempId)
        );
        setEditingIds((prev) => prev.filter((id) => id !== record.tempId));
        messageApi.success("Data berhasil dihapus");
      } else {
        await onDelete(record.id);
        messageApi.success("Data berhasil dihapus");
      }
    } catch (error) {
      messageApi.error("Gagal menghapus data");
      console.error("Delete error:", error);
    }
  };

  const renderEditableCell = (
    column: TableBuilderProps<T>["columns"][0],
    record: EditableRecord & T
  ) => {
    const isEditing = editingIds.includes(record.tempId);
    const value = record[column.dataIndex || column.key];

    if (!isEditing || !column.editable) return value;

    switch (column.inputType) {
      case "number":
        return (
          <Input
            type="number"
            value={value}
            placeholder={column.placeholder}
            onChange={(e) =>
              handleInputChange(
                record.tempId,
                column.key as keyof T,
                Number(e.target.value)
              )
            }
          />
        );
      case "select":
        return (
          <Input
            value={value}
            placeholder={column.placeholder}
            onChange={(e) =>
              handleInputChange(
                record.tempId,
                column.key as keyof T,
                e.target.value
              )
            }
          />
        );
      default:
        return (
          <Input
            value={value}
            placeholder={column.placeholder}
            onChange={(e) =>
              handleInputChange(
                record.tempId,
                column.key as keyof T,
                e.target.value
              )
            }
          />
        );
    }
  };

  const tableColumns: ColumnsType<EditableRecord & T> = [
    {
      title: "#",
      key: "index",
      width: 60,
      render: (_value, _record, index) => index + 1,
    },
    ...columns.map((col) => ({
      title: col.title,
      dataIndex: col.dataIndex || col.key,
      key: col.key,
      render: (_value: any, record: EditableRecord & T) =>
        renderEditableCell(col, record),
    })),
    {
      title: "Aksi",
      key: "actions",
      width: 120,
      render: (_value: any, record: EditableRecord & T) => {
        const isEditing = editingIds.includes(record.tempId);

        return record.isNew ? (
          <Button
            danger
            onClick={() => {
              setDataSource((prev) =>
                prev.filter((item) => item.tempId !== record.tempId)
              );
              setEditingIds((prev) =>
                prev.filter((id) => id !== record.tempId)
              );
            }}
            icon={<CloseOutlined />}
          />
        ) : (
          <div className="flex gap-2">
            <Button
              danger={isEditing}
              onClick={() => {
                setEditingIds((prev) =>
                  isEditing
                    ? prev.filter((id) => id !== record.tempId)
                    : [...prev, record.tempId]
                );
              }}
              icon={isEditing ? <CloseOutlined /> : <EditOutlined />}
            />
            <Popconfirm
              title={deleteConfirmTitle}
              onConfirm={() => handleDelete(record)}
              okText="Ya"
              cancelText="Batal"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {messageContext}
      <div className="flex flex-col gap-y-8">
        <div className="flex justify-end gap-x-4">
          <Button onClick={handleAdd} type="primary" icon={<PlusOutlined />}>
            {addButtonText}
          </Button>
          <Button
            disabled={editingIds.length === 0}
            onClick={async () => {
              const recordsToSave = dataSource.filter((d) =>
                editingIds.includes(d.tempId)
              );
              const results = await Promise.all(
                recordsToSave.map((r) => handleRowSave(r, true))
              );

              const successCount = results.filter(Boolean).length;
              const failedCount = results.length - successCount;

              if (successCount > 0)
                messageApi.success(`${successCount} data berhasil disimpan`);
              if (failedCount > 0)
                messageApi.error(`${failedCount} data gagal disimpan`);
            }}
            icon={<SaveOutlined />}
          >
            Save
          </Button>
        </div>
        <Table
          columns={tableColumns}
          dataSource={dataSource}
          rowKey="tempId"
          loading={loading}
          pagination={false}
        />
      </div>
    </>
  );
}
