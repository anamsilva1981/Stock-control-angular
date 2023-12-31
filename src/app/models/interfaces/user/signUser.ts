export interface SignupUserRequest {
  name: string,
  email: string,
  password: string,
}

export interface SignupUserResponse {
  id: string,
  email: string,
  password: string,
}
