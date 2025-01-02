import { UserService } from "@src/services/user/UserService";
import { UserController } from "@src/controllers/UserControllers";
import express from "express";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.route("/").get(userController.getAllUsers.bind(userController));

export default router;
