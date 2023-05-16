import { UserModel, RoleModel, TokenModel } from '../models/models.js';
import { USER_PLUG_IMG, __dirname } from '../utils/conts.js';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { v4 } from 'uuid';
import fs from 'fs';
import { NextFunction } from 'express';
import ApiError from '../exceptions/ApiError.js';
import { compareSync, hash } from 'bcrypt';
import { UserDto } from '../utils/UserDTO.js';
import TokenService from './TokenService.js';
import { Op, where } from 'sequelize';

class UserService {
  async addUser(
    name: string,
    surname: string,
    patronymic: string,
    login: string,
    password: string,
    image: UploadedFile,
    roleId: number,
  ) {
    let lowerLogin = login.toLowerCase();

    const candidate = await UserModel.findOne({ where: { login: lowerLogin } });

    if (candidate) {
      throw ApiError.BadRequest('Пользователь с таким логином уже создан!', []);
    }

    let imgPathname: string;
    if (image) {
      imgPathname = v4() + '.jpg';
      await image.mv(path.resolve(__dirname, 'static', 'users', imgPathname));
    } else {
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
  async putUser(
    userId: number,
    name: string,
    surname: string,
    patronymic: string,
    image: UploadedFile,
    login: string,
    password: string,
    roleId: number,
    next: NextFunction,
  ) {
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

    let imgPathname = user?.image;

    if (image) {
      imgPathname = v4() + '.jpg';
      image.mv(path.resolve(__dirname, 'static', 'users', imgPathname));

      if (user?.image != USER_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'users', user?.image!), (err: any) => {
          if (err) next(err);
          console.log(`users/${user?.image}.jpg was deleted`);
        });
      }
    }

    if (password) {
      const isPassEquals = compareSync(password, user?.password as string);
      let newPassword = user?.password;
      if (!isPassEquals) {
        newPassword = await hash(password, 5);
      }
      await UserModel.update(
        {
          name,
          surname,
          patronymic,
          image: imgPathname,
          login: lowerLogin,
          password: newPassword,
          roleId: roleId,
        },
        { where: { $id$: userId } },
      );
    } else {
      await UserModel.update(
        {
          name,
          surname,
          patronymic,
          login: lowerLogin,
          image: imgPathname,
          roleId: roleId,
        },
        { where: { $id$: userId } },
      );
    }

    const updatedUser = await UserModel.findOne({
      where: { id: userId },
    });

    const userDto = new UserDto(updatedUser);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: updatedUser };
  }
  async putUserByUser(
    userId: number,
    name: string,
    surname: string,
    patronymic: string,
    image: UploadedFile,
    next: NextFunction,
  ) {
    const user = await UserModel.findOne({
      where: { id: userId },
    });

    let imgPathname = user?.image;

    if (image) {
      imgPathname = v4() + '.jpg';
      image.mv(path.resolve(__dirname, 'static', 'users', imgPathname));

      if (user?.image != USER_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'users', user?.image!), (err: any) => {
          if (err) next(err);
          console.log(`users/${user?.image}.jpg was deleted`);
        });
      }
    }

    await UserModel.update(
      {
        name,
        surname,
        patronymic,
        image: imgPathname,
      },
      { where: { $id$: userId } },
    );

    const updatedUser = await UserModel.findOne({
      where: { id: userId },
    });

    const userDto = new UserDto(updatedUser);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: updatedUser };
  }
  async deleteUser(userId: number, next: NextFunction) {
    const user = await UserModel.findOne({ where: { $id$: userId } });
    if (user)
      if (user?.image != USER_PLUG_IMG) {
        fs.unlink(path.resolve(__dirname, 'static', 'users', user?.image!), (err: any) => {
          if (err) next(err);
          console.log(`users/${user?.image}.jpg was deleted`);
        });
      }
    await UserModel.destroy({ where: { $id$: userId } });
    return user;
  }
  async login(login: string, password: string) {
    const user: UserModel | null = await UserModel.findOne({
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
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizerError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken) as UserDto;
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
  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
  async getUserById(userId: number) {
    const user = await UserModel.findOne({ where: { id: userId } });
    return user;
  }
  async getUsers() {
    const users = await UserModel.findAll();
    return users;
  }
}

export default new UserService();
