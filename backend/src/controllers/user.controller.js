const userService = require("../services/user.service");
const {
	sendSuccessResponse,
	sendErrorResponse,
} = require("../middleware/response_handler");

function handleError(res, err) {
	const status = err.statusCode || 500;
	const message = err.message || "Internal server error";
	const errors = err.errors || [message];
	return sendErrorResponse(res, status, message, errors);
}

async function create(req, res) {
	try {
		const user = await userService.createUser(req.body);
		return sendSuccessResponse(res, 201, "User created successfully", user);
	} catch (err) {
		return handleError(res, err);
	}
}

async function update(req, res) {
	try {
		const id = req.params.id || req.body.id;
		const user = await userService.updateUser(id, req.body);
		return sendSuccessResponse(res, 200, "User updated successfully", user);
	} catch (err) {
		return handleError(res, err);
	}
}

async function details(req, res) {
	try {
		const id = req.params.id || req.body.id;
		const user = await userService.getUserDetails(id);
		return sendSuccessResponse(
			res,
			200,
			"User details retrieved successfully",
			user
		);
	} catch (err) {
		return handleError(res, err);
	}
}

async function remove(req, res) {
	try {
		const id = req.params.id || req.body.id;
		const result = await userService.deleteUser(id);
		return sendSuccessResponse(res, 200, "User deleted successfully", result);
	} catch (err) {
		return handleError(res, err);
	}
}

async function list(req, res) {
	try {
		const data = await userService.listUsers(req.query);
		return sendSuccessResponse(res, 200, "Users retrieved successfully", data);
	} catch (err) {
		return handleError(res, err);
	}
}

module.exports = {
	create,
	update,
	details,
	remove,
	list,
};
