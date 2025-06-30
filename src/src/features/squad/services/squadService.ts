import { createCrudService } from "@/lib/crudFactory";
import { CreateSquadDto, UpdateSquadDto } from "../types/squad.types";
import { Squad } from "@/types/data/squad.types";

export const squadService = createCrudService({
  basePath: "/squads",
  entity: {} as Squad,
  postDto: {} as CreateSquadDto,
  updateDto: {} as UpdateSquadDto,
});
