import ApiError from '../exceptions/ApiError.js';
import TokenService from '../services/TokenService.js';
export default function authMiddleware(req, res, next) {
    try {
        console.log('>> start');
        if (req.method === 'OPTIONS') {
            next();
        }
        const authorizatonHeader = req.headers.authorization;
        if (!authorizatonHeader) {
            return next(ApiError.UnauthorizerError());
        }
        const accessToken = authorizatonHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizerError());
        }
        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizerError());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        res.status(401).json({ message: 'Пользователь не авторизован!' });
    }
}
//# sourceMappingURL=authMiddleware.js.map