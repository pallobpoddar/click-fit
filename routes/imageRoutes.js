import express from "express";
const imageRoutes = express();
import upload from "../configs/files.js";
import imageController from "../controllers/imageController.js";

imageRoutes.post(
	"/upload",
	upload.single("image"),
	imageController.uploadImage
);

export default imageRoutes;
