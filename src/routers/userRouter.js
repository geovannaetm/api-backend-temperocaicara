import express from "express";
import { createUserController } from "../controllers/user/createUserController.js";
//import { loginUserController } from "../controllers/user/loginUserController.js";
import { getUserController } from "../controllers/user/getUserController.js";
import { updateUserController } from "../controllers/user/updateUserController.js";
import { deleteUserController } from "../controllers/user/deleteUserController.js";

const router = express.Router();

router.post("/register", createUserController);
//router.post("/login", loginUserController);
router.get("/:id", getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
