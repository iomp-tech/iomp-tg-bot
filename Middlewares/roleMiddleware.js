import ApiError from '../Exceptions/ApiError.js';
import TokenService from '../Services/TokenService.js';

const roleMiddleware = (roles) => {
	return function (req, res, next) {
		try {
			const token = req.headers.authorization.split(" ")[1]

			if (!token) {
				return next(ApiError.UnauthorizedError())
			}

			const userData = TokenService.validateAccessToken(token)

			if (!userData) {
				return next(ApiError.UnauthorizedError())
			}

			let hasRole = false

			userData.roles.forEach(role => {
				if (roles.includes(role)) {
					hasRole = true
				}
			})

			if (!hasRole) {
				return next(ApiError.NoRightsError())
			}

			next()
		} catch (e) {
			console.log(e)

			res.status(403).json({ message: "Пользователь не авторизован" })
		}
	}
}

export default roleMiddleware