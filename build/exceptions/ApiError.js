class ApiError extends Error {
    constructor(_status, _message, _errors) {
        super(_message);
        this.status = _status;
        this.errors = _errors;
    }
}
ApiError.BadRequest = (message, errors) => new ApiError(400, message, errors);
ApiError.UnauthorizerError = () => new ApiError(401, 'Пользователь не авторизован', []);
export default ApiError;
//# sourceMappingURL=ApiError.js.map