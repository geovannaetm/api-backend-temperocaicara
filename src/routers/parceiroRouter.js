import { Router } from "express";
import { createParceiroController } from "../controllers/parceiro/createParceiroController.js";
//import { loginParceiroController } from "../controllers/parceiro/loginParceiroController.js";
import { getParceiroController } from "../controllers/parceiro/getParceiroController.js";
import { updateParceiroController } from "../controllers/parceiro/updateParceiroController.js";
import { deleteParceiroController } from "../controllers/parceiro/deleteParceiroController.js";

const router = Router();

router.post("/", createParceiroController);          // create
//router.post("/login", loginParceiroController);      // login
router.get("/", getParceiroController);              // get all
router.get("/:id", getParceiroController);          // get by id
router.put("/:id", updateParceiroController);        // update
router.delete("/:id", deleteParceiroController);     // delete

export default router;
