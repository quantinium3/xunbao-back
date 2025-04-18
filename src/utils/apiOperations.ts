class ApiResponse {
  statusCode: number;
  data: null | unknown;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: null | unknown, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
