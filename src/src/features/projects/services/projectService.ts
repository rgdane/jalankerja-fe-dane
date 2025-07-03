import { createCrudService } from "@/lib/crudFactory";
import { CreateProjectDto, UpdateProjectDto } from "../types/project.types";
import { Project } from "@/types/data/project.types";

export const projectService = createCrudService({
  basePath: "/projects",
  entity: {} as Project,
  postDto: {} as CreateProjectDto,
  updateDto: {} as UpdateProjectDto,
});
