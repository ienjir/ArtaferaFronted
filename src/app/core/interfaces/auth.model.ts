export type TokenPair = {
  access_token: string;
  refresh_token: string;
};

export type LoginResponse = {
  token: TokenPair;
};

export type RegisterRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  token: TokenPair;
};

export type JwtPayload = {
  email?: string;
  id?: number;
  role?: string;
  type?: string;
  exp?: number;
};
