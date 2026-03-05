const sendSuccessResponse = (res, statusCode, message, data = {}) => {
	return res.status(statusCode).json({
		success: true,
		status_code: statusCode,
		message,
		data,
	});
};

const sendErrorResponse = (res, statusCode, message, data = []) => {
	return res.status(statusCode).json({
		success: false,
		status_code: statusCode,
		message,
		data,
	});
};

module.exports = {
	sendSuccessResponse,
	sendErrorResponse,
};
