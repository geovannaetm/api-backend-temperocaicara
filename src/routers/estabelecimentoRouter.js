import { Router } from "express";
import { createEstabelecimentoController } from "../controllers/estabelecimento/createEstabelecimentoController.js";
import { getEstabelecimentoController } from "../controllers/estabelecimento/getEstabelecimentoController.js";
import { updateEstabelecimentoController } from "../controllers/estabelecimento/updateEstabelecimentoController.js";
import { deleteEstabelecimentoController } from "../controllers/estabelecimento/deleteEstabelecimentoController.js";

const router = Router();

router.post("/", createEstabelecimentoController);
router.get("/", getEstabelecimentoController);
router.get("/:id", getEstabelecimentoController);
router.put("/:id", updateEstabelecimentoController);
router.delete("/:id", deleteEstabelecimentoController);

export default router;
