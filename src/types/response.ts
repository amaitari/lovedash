  export   interface SuccessResponse< T = unknown> {
    success: true;
    error: string | null;
    data: T;
}

export interface ErrorResponse {
    success: false;
    error: string;
}

export interface Response {
  message: string;
  status: string;
}