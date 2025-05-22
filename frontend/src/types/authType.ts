export interface Decoded {
  users: { userid: string; pass: string };
  token: string;
  menu: {
    id: string;
    tieude: string;
    url: string;
    module: string;
    tenham: string;
  }[];
}

export interface LoginResponse {
  message: string;
  results: string;
  users: {
    userid: string;
    pass: string;
  }[];
  token: string;
}

export interface AuthState {
  loading: boolean;
  decoded: Decoded | null;
  error: string | null;

  loggedIn: boolean;
  users: LoginResponse | null;
  mess: string | null;
  successCode: number;
}

export const initialState: AuthState = {
 
  decoded: null,
  loading: false,
  error: null,
  users: null,
  mess: null,
  loggedIn: false,
  successCode: 0,
};
