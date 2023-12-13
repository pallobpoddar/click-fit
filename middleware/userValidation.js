import { body } from "express-validator";

const userValidator = {
	addUser: [
		body("email")
			.exists()
			.withMessage("Email is required")
			.bail()
			.isEmail()
			.withMessage("Invalid email"),
		body("password")
			.exists()
			.withMessage("Password is required")
			.bail()
			.trim()
			.notEmpty()
			.withMessage("Password is required")
			.bail()
			.isLength({ max: 255 })
			.withMessage("Character limit exceeded"),
		body("type")
			.exists()
			.withMessage("Type is required")
			.bail()
			.trim()
			.notEmpty()
			.withMessage("Type is required")
			.bail()
			.isLength({ max: 255 })
			.withMessage("Character limit exceeded"),
		body("active")
			.optional()
			.isIn([0, 1])
			.withMessage("Active can only be 0 or 1"),
	],
};

export default userValidator;
