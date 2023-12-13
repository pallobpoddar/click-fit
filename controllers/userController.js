import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../constants/statusCodes.js";
import sendResponse from "../utils/commonResponse.js";
import user from "../models/user.js";

class UserController {
	async addUser(req, res) {
		try {
			const allowedProperties = ["email", "password", "type", "active"];
			const unexpectedProps = Object.keys(req.body).filter(
				(key) => !allowedProperties.includes(key)
			);
			if (unexpectedProps.length > 0) {
				return sendResponse(
					res,
					HTTP_STATUS.UNPROCESSABLE_ENTITY,
					"Failed to add user",
					`Unexpected properties: ${unexpectedProps.join(", ")}`
				);
			}

			const validation = validationResult(req).array();
			if (validation.length > 0) {
				return sendResponse(
					res,
					HTTP_STATUS.UNPROCESSABLE_ENTITY,
					validation[0].msg,
					validation
				);
			}

			const { email, password, type, active } = req.body;

			const hashedPassword = await bcrypt
				.hash(password, 10)
				.then((hash) => {
					return hash;
				});

			const result = user.addUser(email, hashedPassword, type, active);

			return sendResponse(
				res,
				HTTP_STATUS.OK,
				"Successfully added the user",
				result
			);
		} catch (error) {
			console.log(error);
			return sendResponse(
				res,
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				"Internal server error"
			);
		}
	}
}

export default new UserController();
