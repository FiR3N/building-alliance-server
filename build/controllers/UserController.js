import UserService from '../services/UserService.js';
class UserController {
    async addUser(req, res, next) {
        var _a;
        try {
            const { name, surname, patronymic, login, password, roleId } = req.body;
            const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const user = await UserService.addUser(name, surname, patronymic, login, password, image, roleId);
            return res.status(200).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async putUser(req, res, next) {
        var _a;
        try {
            const userId = Number(req.params.userId);
            const { name, surname, patronymic, password, login, roleId } = req.body;
            const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const updatedUser = await UserService.putUser(userId, name, surname, patronymic, image, login, password, roleId, next);
            return res.status(200).json(updatedUser);
        }
        catch (e) {
            next(e);
        }
    }
    async putUserByUser(req, res, next) {
        var _a;
        try {
            const userId = Number(req.params.userId);
            const { name, surname, patronymic } = req.body;
            const image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
            const updatedUser = await UserService.putUserByUser(userId, name, surname, patronymic, image, next);
            res.cookie('refreshToken', updatedUser.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
            return res.status(200).json(updatedUser.user);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const userId = Number(req.params.userId);
            const user = await UserService.deleteUser(userId, next);
            return res.status(200).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const userData = await UserService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }
        catch (e) {
            next(e);
        }
    }
    async getUserById(req, res, next) {
        try {
            const userId = Number(req.params.userId);
            const user = await UserService.getUserById(userId);
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
}
export default new UserController();
//# sourceMappingURL=UserController.js.map