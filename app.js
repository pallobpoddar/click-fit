import express, { json, text, urlencoded } from "express";
const app = express();
import morgan from "morgan";
import { createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import { MulterError } from "multer";
import HTTP_STATUS from "./constants/statusCodes.js";
import sendResponse from "./utils/commonResponse.js";
import imageRoutes from "./routes/imageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { databaseConnection } from "./configs/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accessLogStream = createWriteStream(join(__dirname, "logFile.log"), {
	flags: "a",
});

dotenv.config();

app.use(cors());

app.use(json());
app.use(text());
app.use(urlencoded({ extended: true }));

app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		return sendResponse(
			res,
			HTTP_STATUS.BAD_REQUEST,
			"Invalid JSON error",
			"Bad request"
		);
	}
	next();
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
app.use(async (req, res) => {
	return sendResponse(
		res,
		HTTP_STATUS.NOT_FOUND,
		"Page not found",
		"Not found"
	);
});

app.use((err, req, res, next) => {
	if (err instanceof MulterError) {
		return sendResponse(res, HTTP_STATUS.NOT_FOUND, err.message);
	} else {
		next(err);
	}
});

databaseConnection(() => {
	app.listen(8000, () => {
		console.log("Server is running on 8000");
	});
});
