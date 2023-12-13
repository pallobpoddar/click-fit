import express from "express";
const userRoutes = express();
import userValidator from "../middleware/userValidation.js";
import userController from "../controllers/userController.js";

userRoutes.post("/add", userValidator.addUser, userController.addUser);

export default userRoutes;
