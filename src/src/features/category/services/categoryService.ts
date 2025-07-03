import { createCrudService } from "@/lib/crudFactory";
import { CreateCategoryDto, UpdateCategoryDto } from "../types/category.types";
import { Category } from "@/types/data/category.types";

export const categoryService = createCrudService({
  basePath: "/categories",
  entity: {} as Category,
  postDto: {} as CreateCategoryDto,
  updateDto: {} as UpdateCategoryDto,
});
