import jwt from 'jsonwebtoken';
import TokenModel from '../models/TokenModel.js';
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
            expiresIn: '30m',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
            expiresIn: '30d',
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({
            where: { $userId$: userId },
        });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({ refreshToken, userId });
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenModel.destroy({
            where: { refreshToken: refreshToken },
        });
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({
            where: { refreshToken: refreshToken },
        });
        return tokenData;
    }
}
export default new TokenService();
//# sourceMappingURL=TokenService.js.map