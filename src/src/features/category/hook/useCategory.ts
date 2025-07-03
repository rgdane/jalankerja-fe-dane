"use client";
import { Category } from "@/types/data/category.types";
import { categoryService } from "../services/categoryService";

export const useCategoryAction = () => {
  const fetchCategorys = async (): Promise<Category[]> => {
    const res = await categoryService.local.getAll();
    return res.data.data;
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoryService.local.remove(id);
    } catch (err) {
      throw err;
    }
  };

  const createCategory = async (payload: any) => {
    try {
      await categoryService.local.post(payload);
    } catch (error: any) {
      throw error;
    }
  };

  const updateCategory = async (id: number, payload: any) => {
    try {
      await categoryService.local.update(id, payload);
    } catch (error: any) {
      throw error;
    }
  };

  return {
    fetchCategorys,
    createCategory,
    deleteCategory,
    updateCategory,
  };
};
