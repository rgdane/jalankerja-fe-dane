"use client";
import { useEffect, useState } from "react";
import { useSquadActions } from "../hook/useSquad";
import { TableBuilder } from "@/components/fragments/builder/TableBuilder";
import { Squad } from "@/types/data/squad.types";


export default function SquadList() {
  const { fetchSquads, createSquad, deleteSquad, updateSquad } =
    useSquadActions();
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDatas = async () => {
    setLoading(true);
    try {
      const data = await fetchSquads();
      console.log(data);
      setSquads(data);
    } catch (error) {
      console.error("Failed to load squads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatas();
  }, []);

  const handleCreate = async (data: Omit<Squad, "id">) => {
    await createSquad(data);
    await loadDatas(); // Refresh data
  };

  const handleUpdate = async (id: number, data: Partial<Squad>) => {
    await updateSquad(id, data);
    await loadDatas(); // Refresh data
  };

  const handleDelete = async (id: number) => {
    await deleteSquad(id);
    await loadDatas(); // Refresh data
  };

  const squadColumns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      editable: true,
      placeholder: "Masukkan nama squad",
    },
    {
      key: "description",
      title: "Deskripsi",
      dataIndex: "description",
      editable: true,
      placeholder: "Masukkan deskripsi",
    },
  ];

  return (
    <TableBuilder<Squad>
      datas={squads}
      columns={squadColumns}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      addButtonText="Add Squad"
      deleteConfirmTitle="Hapus squad ini?"
      emptyRecord={{ name: "" }}
    />
  );
}
