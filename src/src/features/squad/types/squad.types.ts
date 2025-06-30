export type CreateSquadDto = {
  Name: string;
  description?: string;
  general_project_id?: number;
  anggota?: number[];
};

export type UpdateSquadDto = {
  name?: string;
  description?: string;
};
