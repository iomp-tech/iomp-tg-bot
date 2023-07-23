export default class ApiError extends Error {
	status;
	fieldError;

	constructor(status, message, fieldError = "") {
		super(message);
		this.status = status;
		this.fieldError = fieldError;
	}

	static UnauthorizedError() {
		return new ApiError(401, 'Пользователь не авторизован')
	}

	static NoRightsError() {
		return new ApiError(401, 'У вас нет прав для этой функции')
	}

	static BadRequest(message, fieldError = "") {
		return new ApiError(400, message, fieldError);
	}
}