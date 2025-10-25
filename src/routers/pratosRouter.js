import express from "express";
import { createPratosController } from "../controllers/pratos/createPratosController.js";
import { getPratosController } from "../controllers/pratos/getPratosController.js";
import { updatePratosController } from "../controllers/pratos/updatePratosController.js";
import { deletePratosController } from "../controllers/pratos/deletePratosController.js";

const router = express.Router();

// Rotas CRUD
router.get("/", getPratosController);        // GET todos
router.get("/:id", getPratosController);     // GET por ID
router.post("/", createPratosController);    // CREATE
router.put("/:id", updatePratosController);  // UPDATE
router.delete("/:id", deletePratosController); // DELETE

export default router;
