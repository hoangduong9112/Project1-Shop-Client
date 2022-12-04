export interface AuthResponse {
  data: AuthResponseData;
  status: number;
}

export interface AuthResponseData {
  accessToken: string;
}

export interface ErrorResponse {
  errorMessage: string;
  status: number;
}
