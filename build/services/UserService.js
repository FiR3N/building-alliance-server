import { UserModel } from '../models/models.js';
import { USER_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { v4 } from 'uuid';
import fs from 'fs';
import ApiError from '../exceptions/ApiError.js';
import { compareSync, hash } from 'bcrypt';
import { UserDto } from '../utils/UserDTO.js';
import TokenService from './TokenService.js';
import { Op } from 'sequelize';
class UserService {
    async addUser(name, surname, patronymic, login, password, image, roleId) {
        let lowerLogin = login.toLowerCase();
        const candidate = await UserModel.findOne({ where: { login: lowerLogin } });
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким логином уже создан!', []);
        }
        let imgPathname;
        if (image) {
            imgPathname = v4() + '.jpg';
            await image.mv(path.resolve(__dirname, 'static', 'users', imgPathname));
        }
        else {
            imgPathname = USER_PLUG_IMG;
        }
        const hashPassword = await hash(password, 5);
        const user = await UserModel.create({
            name,
            surname,
            patronymic,
            image: imgPathname,
            login: lowerLogin,
            password: hashPassword,
            roleId: roleId,
        });
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return user;
    }
    async putUser(userId, name, surname, patronymic, image, login, password, roleId, next) {
        let lowerLogin = login.toLowerCase();
        const candidate = await UserModel.findOne({
            where: {
                login: lowerLogin,
                id: {
                    [Op.ne]: userId,
                },
            },
        });
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким логином уже существует!', []);
        }
        const user = await UserModel.findOne({
            where: { id: userId },
        });
        let imgPathname = user === null || user === void 0 ? void 0 : user.image;
        if (image) {
            imgPathname = v4() + '.jpg';
            image.mv(path.resolve(__dirname, 'static', 'users', imgPathname));
            if ((user === null || user === void 0 ? void 0 : user.image) != USER_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'users', user === null || user === void 0 ? void 0 : user.image), (err) => {
                    if (err)
                        next(err);
                    console.log(`users/${user === null || user === void 0 ? void 0 : user.image}.jpg was deleted`);
                });
            }
        }
        if (password) {
            const isPassEquals = compareSync(password, user === null || user === void 0 ? void 0 : user.password);
            let newPassword = user === null || user === void 0 ? void 0 : user.password;
            if (!isPassEquals) {
                newPassword = await hash(password, 5);
            }
            await UserModel.update({
                name,
                surname,
                patronymic,
                image: imgPathname,
                login: lowerLogin,
                password: newPassword,
                roleId: roleId,
            }, { where: { $id$: userId } });
        }
        else {
            await UserModel.update({
                name,
                surname,
                patronymic,
                login: lowerLogin,
                image: imgPathname,
                roleId: roleId,
            }, { where: { $id$: userId } });
        }
        const updatedUser = await UserModel.findOne({
            where: { id: userId },
        });
        const userDto = new UserDto(updatedUser);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: updatedUser };
    }
    async putUserByUser(userId, name, surname, patronymic, image, next) {
        const user = await UserModel.findOne({
            where: { id: userId },
        });
        let imgPathname = user === null || user === void 0 ? void 0 : user.image;
        if (image) {
            imgPathname = v4() + '.jpg';
            image.mv(path.resolve(__dirname, 'static', 'users', imgPathname));
            if ((user === null || user === void 0 ? void 0 : user.image) != USER_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'users', user === null || user === void 0 ? void 0 : user.image), (err) => {
                    if (err)
                        next(err);
                    console.log(`users/${user === null || user === void 0 ? void 0 : user.image}.jpg was deleted`);
                });
            }
        }
        await UserModel.update({
            name,
            surname,
            patronymic,
            image: imgPathname,
        }, { where: { $id$: userId } });
        const updatedUser = await UserModel.findOne({
            where: { id: userId },
        });
        const userDto = new UserDto(updatedUser);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: updatedUser };
    }
    async deleteUser(userId, next) {
        const user = await UserModel.findOne({ where: { $id$: userId } });
        if (user)
            if ((user === null || user === void 0 ? void 0 : user.image) != USER_PLUG_IMG) {
                fs.unlink(path.resolve(__dirname, 'static', 'users', user === null || user === void 0 ? void 0 : user.image), (err) => {
                    if (err)
                        next(err);
                    console.log(`users/${user === null || user === void 0 ? void 0 : user.image}.jpg was deleted`);
                });
            }
        await UserModel.destroy({ where: { $id$: userId } });
        return user;
    }
    async login(login, password) {
        const user = await UserModel.findOne({
            where: { login: login },
        });
        if (!user) {
            throw ApiError.BadRequest('Неверный email или пароль', []);
        }
        const isPassEquals = compareSync(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный email или пароль', []);
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizerError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizerError();
        }
        const user = await UserModel.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }
    async getUserById(userId) {
        const user = await UserModel.findOne({ where: { id: userId } });
        return user;
    }
    async getUsers() {
        const users = await UserModel.findAll();
        return users;
    }
}
export default new UserService();
//# sourceMappingURL=UserService.js.map