export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export type AuthDto = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token?: string;
  message?: string;
};
