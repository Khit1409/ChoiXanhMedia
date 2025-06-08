export interface UsersSate {
  name: string;
  email: string;
  password: string;
  roles: string;
  phone: string;
  avatar: string;
  gender: string;
}
export interface LoginResponse {
  message: string;
  resultCode: number;
}
export interface CheckAuthResponse {
  user: UsersSate[];
  category: UserCategory[];
}
export interface UserCategory {
  id: number;
  name: string;
  url: string;
}

export interface AuthState {
  loading: boolean;
  error: string | undefined;
  user_category: UserCategory []| null;
  loggedIn: boolean | null;
  users: UsersSate | null;
  resultCode: number|undefined;
}

export const initialState: AuthState = {
  loading: false,
  user_category: null,
  error: undefined,
  users: null,
  loggedIn: null,
  resultCode: undefined,
};
