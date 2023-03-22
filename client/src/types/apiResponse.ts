export interface ApiResponse {
  code: number;
  description: string;
  data?: Record<string, any>;
}

export interface ApiErrorResponse extends Error {
  code: number;
  description: string;
}
