"use client";
import { Project } from "@/types/data/project.types";
import { projectService } from "../services/projectService";

export const useProjectAction = () => {
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
