export type CreateProjectDto = {
  nama: string;
  kode: string;
  deskripsi?: string;
  start_date: string;
  end_date: string;
};

export type UpdateProjectDto = {
  name?: string;
  kode: string;
  deskripsi?: string;
  start_date: string;
  end_date: string;
};
