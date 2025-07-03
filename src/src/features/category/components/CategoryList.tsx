"use client";
import { useEffect, useState } from "react";
import { TableBuilder } from "@/components/fragments/builder/TableBuilder";
import { useCategoryAction } from "../hook/useCategory";
import { Category } from "@/types/data/category.types";

export default function CategoryList() {
  const { fetchCategorys, createCategory, deleteCategory, updateCategory } =
    useCategoryAction();
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDatas = async () => {
    setLoading(true);
    try {
      const data = await fetchCategorys();
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.error("Failed to load datas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatas();
  }, []);

  const handleCreate = async (data: Omit<Category, "id">) => {
    await createCategory(data);
    await loadDatas(); // Refresh data
  };

  const handleUpdate = async (id: number, data: Partial<Category>) => {
    await updateCategory(id, data);
    await loadDatas(); // Refresh data
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    await loadDatas(); // Refresh data
  };

  const columns = [
    {
    key: "code",
    title: "Kode",
    dataIndex: "code",
    editable: true,
    placeholder: "Masukkan kode",
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      editable: true,
      placeholder: "Masukkan nama category",
    },
  ];

  return (
    <TableBuilder<Category>
      datas={category}
      columns={columns}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      addButtonText="Add Category"
      deleteConfirmTitle="Hapus Category ini?"
      emptyRecord={{
        code: "",
        name: ""
    }}
    />
  );
}
