export interface CreateProjectDto {
  name: string;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
}

export type UpdateProjectDto = {
  name?: string;
  code?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};