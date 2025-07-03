export type CreateProjectDto = {
  nama: string;
  deskripsi?: string;
};

export type UpdateProjectDto = {
  name?: string;
  deskripsi?: string;
};
