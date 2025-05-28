export interface CheckAuthState {
  message: string;
  resultCode: number;
  users: { userid: string; pass: string };
  token: string;
}
export interface UsersSate {
  userid: string;
  pass: string;
}
export interface LoginResponse {
  message: string;
  resultCode: number;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  loggedIn: boolean | null;
  users: UsersSate | null;
  resultCode: number;
}

export const initialState: AuthState = {
  loading: false,
  error: null,
  users: null,
  loggedIn: null,
  resultCode: 0,
};
