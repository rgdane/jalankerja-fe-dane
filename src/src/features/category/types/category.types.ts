export type CreateCategoryDto = {
  name: string;
  code: string;
};

export type UpdateCategoryDto = {
  name?: string;
  code?: string;
};