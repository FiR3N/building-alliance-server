export default class ApiError extends Error {
  status: number;
  errors: any[];
  constructor(_status: number, _message: string, _errors: any[]) {
    super(_message);
    this.status = _status;
    this.errors = _errors;
  }

  static BadRequest = (message: string, errors: any[]) => new ApiError(400, message, errors);
  static UnauthorizerError = () => new ApiError(401, 'Пользователь не авторизован', []);
  // static InternalError = (message: string, errors: any[]) => new ApiError(500, message, errors);
}
