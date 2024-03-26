export interface UserModelResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  is_admin?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegister {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserState {
  users: UserModelResponse[] | [];
  loading: boolean;
  error: string | null;
}
