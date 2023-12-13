import fileTypes from "../constants/fileTypes.js";
import HTTP_STATUS from "../constants/statusCodes.js";
import sendResponse from "../utils/commonResponse.js";

class ImageController {
	async uploadImage(req, res) {
		try {
			if (!fileTypes.includes(req.file_extension)) {
				return sendResponse(
					res,
					HTTP_STATUS.NOT_FOUND,
					"Only .jpg, .jpeg and .png formats are allowed"
				);
			}

			if (!req.file) {
				return sendResponse(
					res,
					HTTP_STATUS.NOT_FOUND,
					"No image was found"
				);
			}

			return sendResponse(
				res,
				HTTP_STATUS.OK,
				"Successfully uploaded the image",
				req.file
			);
		} catch (error) {
			return sendResponse(
				res,
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				"Internal server error"
			);
		}
	}
}

export default new ImageController();
