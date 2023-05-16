import TokenService from '../services/TokenService.js';
export default function (roleId) {
    return function (req, res, next) {
        var _a;
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'Пользователь не авторизован!' });
            }
            const decoded = TokenService.validateAccessToken(token);
            if (roleId.includes(Number(decoded === null || decoded === void 0 ? void 0 : decoded.roleId))) {
                res.status(403).json({ message: 'Нет доступа' });
            }
            req.user = decoded;
            next();
        }
        catch (e) {
            res.status(401).json({ message: 'Пользователь не авторизован!' });
        }
    };
}
//# sourceMappingURL=checkRoleMiddleware.js.map