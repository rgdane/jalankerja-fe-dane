export interface CreateProjectDto {
  name: string;
  code: string;
  description: string;
  start_date: string;
  end_date: string;
}

export type UpdateProjectDto = {
  name?: string;
  code?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
};