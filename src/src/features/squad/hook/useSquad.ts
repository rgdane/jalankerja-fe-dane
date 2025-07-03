"use client";
import { squadService } from "@/features/squad/services/squadService";
import { Squad } from "@/types/data/squad.types";

export const useSquadActions = () => {
  const fetchSquads = async (): Promise<Squad[]> => {
    const res = await squadService.local.getAll();
    return res.data.data;
  };

  const deleteSquad = async (id: number) => {
    try {
      await squadService.local.remove(id);
    } catch (err) {
      throw err;
    }
  };

  const createSquad = async (payload: any) => {
    try {
      await squadService.local.post(payload);
    } catch (error: any) {
      throw error;
    }
  };

  const updateSquad = async (id: number, payload: any) => {
    try {
      await squadService.local.update(id, payload);
    } catch (error: any) {
      throw error;
    }
  };

  return {
    fetchSquads,
    createSquad,
    deleteSquad,
    updateSquad,
  };
};
