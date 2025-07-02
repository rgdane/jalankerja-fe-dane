import { createCrudService } from "@/lib/crudFactory";
import { CreateUserDto, UpdateUserDto } from "../types/user.types";
import { User } from "@/types/data/user.types";

export const userService = createCrudService({
  basePath: "/users",
  entity: {} as User,
  postDto: {} as CreateUserDto,
  updateDto: {} as UpdateUserDto,
});
