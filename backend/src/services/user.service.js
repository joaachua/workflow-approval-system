const bcrypt = require("bcrypt");
const userRepo = require("../repositories/user.repository");

function isEmail(value) {
	return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanString(v) {
	return typeof v === "string" ? v.trim() : v;
}

async function createUser(payload) {
	const username = cleanString(payload.username);
	const full_name = cleanString(payload.full_name);
	const email = cleanString(payload.email);
	const password = payload.password;

	const errors = [];

	if (!username) errors.push("username is required");
	if (!full_name) errors.push("full_name is required");
	if (!email || !isEmail(email)) errors.push("valid email is required");
	if (!password || String(password).length < 8)
		errors.push("password must be at least 8 characters");

	if (errors.length) {
		const err = new Error("Validation error");
		err.statusCode = 422;
		err.errors = errors;
		throw err;
	}

	const [emailExists, usernameExists] = await Promise.all([
		userRepo.findByEmail(email),
		userRepo.findByUsername(username),
	]);

	if (emailExists) {
		const err = new Error("Email already in use");
		err.statusCode = 409;
		err.errors = ["email already in use"];
		throw err;
	}

	if (usernameExists) {
		const err = new Error("Username already in use");
		err.statusCode = 409;
		err.errors = ["username already in use"];
		throw err;
	}

	const password_hash = await bcrypt.hash(String(password), 10);

	// NOTE: adjust fields to match your DB columns
	const user = await userRepo.createUser({
		username,
		full_name,
		email,
		password_hash,
		created_at: new Date(),
		updated_at: new Date(),
	});

	// never return password hash
	delete user.password_hash;

	return user;
}

async function updateUser(id, payload) {
	if (!id) {
		const err = new Error("id is required");
		err.statusCode = 400;
		err.errors = ["id is required"];
		throw err;
	}

	const existing = await userRepo.findById(id);
	if (!existing) {
		const err = new Error("User not found");
		err.statusCode = 404;
		err.errors = ["user not found"];
		throw err;
	}

	const updateData = {};
	const errors = [];

	if (payload.username !== undefined) {
		const username = cleanString(payload.username);
		if (!username) errors.push("username cannot be empty");
		else updateData.username = username;
	}

	if (payload.full_name !== undefined) {
		const full_name = cleanString(payload.full_name);
		if (!full_name) errors.push("full_name cannot be empty");
		else updateData.full_name = full_name;
	}

	if (payload.email !== undefined) {
		const email = cleanString(payload.email);
		if (!email || !isEmail(email)) errors.push("valid email is required");
		else updateData.email = email;
	}

	if (payload.password !== undefined) {
		if (!payload.password || String(payload.password).length < 8) {
			errors.push("password must be at least 8 characters");
		} else {
			updateData.password_hash = await bcrypt.hash(
				String(payload.password),
				10
			);
		}
	}

	if (errors.length) {
		const err = new Error("Validation error");
		err.statusCode = 422;
		err.errors = errors;
		throw err;
	}

	// Check conflicts if changing email/username
	if (
		updateData.email &&
		updateData.email.toLowerCase() !== String(existing.email).toLowerCase()
	) {
		const found = await userRepo.findByEmail(updateData.email);
		if (found && found.id !== existing.id) {
			const err = new Error("Email already in use");
			err.statusCode = 409;
			err.errors = ["email already in use"];
			throw err;
		}
	}

	if (
		updateData.username &&
		updateData.username.toLowerCase() !==
			String(existing.username).toLowerCase()
	) {
		const found = await userRepo.findByUsername(updateData.username);
		if (found && found.id !== existing.id) {
			const err = new Error("Username already in use");
			err.statusCode = 409;
			err.errors = ["username already in use"];
			throw err;
		}
	}

	updateData.updated_at = new Date();

	const updated = await userRepo.updateUser(id, updateData);
	if (updated) delete updated.password_hash;

	return updated;
}

async function getUserDetails(id) {
	const user = await userRepo.findById(id);
	if (!user) {
		const err = new Error("User not found");
		err.statusCode = 404;
		err.errors = ["user not found"];
		throw err;
	}
	delete user.password_hash;
	return user;
}

async function deleteUser(id) {
	const user = await userRepo.findById(id);
	if (!user) {
		const err = new Error("User not found");
		err.statusCode = 404;
		err.errors = ["user not found"];
		throw err;
	}
	await userRepo.deleteUser(id);
	return { id };
}

async function listUsers(query) {
	return userRepo.listUsers(query);
}

module.exports = {
	createUser,
	updateUser,
	getUserDetails,
	deleteUser,
	listUsers,
};
