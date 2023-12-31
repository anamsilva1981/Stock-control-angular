export interface AuthUserRequest {
  email: string,
  password: string,
}

export interface AuthUserResponse {
  id: string,
  name: string;
  email: string,
  token: string,
}
