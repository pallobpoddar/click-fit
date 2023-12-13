import multer, { diskStorage } from "multer";
import { extname } from "path";
import fileTypes from "../constants/fileTypes.js";

const upload = multer({
	limits: {
		fileSize: 10000000,
	},
	storage: diskStorage({
		destination: (req, file, callback) => {
			if (file) {
				callback(null, "./uploadImages");
			} else {
				req.file.error = "No file was found";
				callback("No file was found", null);
			}
		},
		filename: (req, file, callback) => {
			if (file) {
				callback(null, Date.now() + "_" + file.originalname);
			} else {
				callback("No file was found", null);
			}
		},
	}),
	fileFilter: (req, file, callback) => {
		if (file) {
			const extension = extname(file.originalname);
			req.file_extension = extension;
			if (fileTypes.includes(extension)) {
				callback(null, true);
			} else {
				callback(null, false);
			}
		} else {
			callback("No file was found", false);
		}
	},
});

export default upload;
