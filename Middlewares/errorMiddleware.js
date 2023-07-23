import ApiError from '../Exceptions/ApiError.js';

const errorMiddleware = (err, req, res, next) => {
	console.log(err)

	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, fieldError: err.fieldError })
	}

	return res.status(500).json({ message: "Непредвиденная ошибка" })
}

export default errorMiddleware