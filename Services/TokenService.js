import jwt from 'jsonwebtoken'

import TokenUser from '../Models/TokenUser.js';

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" })
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })

		return {
			accessToken,
			refreshToken,
		}
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	async saveTokenUser(id, refreshToken) {
		const tokenData = await TokenUser.findOne({ userId: id })

		if (tokenData) {
			tokenData.refreshToken = refreshToken

			return tokenData.save()
		}

		const token = await TokenUser.create({ userId: id, refreshToken })

		return token
	}

	async removeTokenUser(refreshToken) {
		const tokenData = await TokenUser.deleteOne({ refreshToken })
		return tokenData;
	}

	async findTokenUser(refreshToken) {
		const tokenData = await TokenUser.findOne({ refreshToken })
		return tokenData
	}
}

export default new TokenService