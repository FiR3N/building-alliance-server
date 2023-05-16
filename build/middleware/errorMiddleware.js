import ApiError from '../exceptions/ApiError.js';
export default function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        console.log('error >> ', err.message);
        return res.status(err.status).json({ message: err.message, erorrs: err.errors });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
//# sourceMappingURL=errorMiddleware.js.map