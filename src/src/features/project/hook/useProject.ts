"use client";
import { projectService } from "@/features/project/services/projectService";
import { Project } from "@/types/data/project.types";

export const useProjectActions = () => {
  const fetchProjects = async (): Promise<Project[]> => {
    const res = await projectService.local.getAll();
    return res.data.data;
  };

  const deleteProject = async (id: number) => {
    try {
      await projectService.local.remove(id);
    } catch (err) {
      throw err;
    }
  };

  const createProject = async (payload: any) => {
    try {
      await projectService.local.post(payload);
    } catch (error: any) {
      throw error;
    }
  };

  const updateProject = async (id: number, payload: any) => {
    try {
      await projectService.local.update(id, payload);
    } catch (error: any) {
      throw error;
    }
  };

  return {
    fetchProjects,
    createProject,
    deleteProject,
    updateProject,
  };
};
