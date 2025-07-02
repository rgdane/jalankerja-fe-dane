export interface CreateUserDto {
  name: string;
  email: string;
}

export type UpdateUserDto = {
  name?: string;
  email?: string;
};