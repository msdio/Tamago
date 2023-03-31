export interface ApiResponse {
  code: number;
  description: string;
  result?: any;
}

export interface ApiErrorResponse extends Error {
  code: number;
  description: string;
}
