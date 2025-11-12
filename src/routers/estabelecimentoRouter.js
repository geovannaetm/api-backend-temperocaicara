import { Router } from "express";
import { createEstabelecimentoController } from "../controllers/estabelecimento/createEstabelecimentoController.js";
import { getEstabelecimentoController } from "../controllers/estabelecimento/getEstabelecimentoController.js";
import { updateEstabelecimentoController } from "../controllers/estabelecimento/updateEstabelecimentoController.js";
import { deleteEstabelecimentoController } from "../controllers/estabelecimento/deleteEstabelecimentoController.js";
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();


const router = Router();

router.post("/", createEstabelecimentoController);
router.get("/", getEstabelecimentoController);
router.get("/:id", getEstabelecimentoController);
router.put("/:id", updateEstabelecimentoController);
router.delete("/:id", deleteEstabelecimentoController);

// GET /api/estabelecimentos/me/:admId
router.get("/me/:admId", async (req, res) => {
  const admId = parseInt(req.params.admId);

  try {
    // Verifica se já existe
    let est = await prisma.estabelecimentos.findFirst({
      where: { adm_id_adm: admId },
    });

    // Se não existir, cria com dados padrão
    if (!est) {
      est = await prisma.estabelecimentos.create({
        data: {
          nome: "Novo Estabelecimento",
          decricao: "Descrição padrão",
          numero: "00000",
          logo_url: "",
          cover_url: "",
          adm_id_adm: admId,
        },
      });
    }

    res.json(est);
  } catch (error) {
    console.error("Erro ao buscar/criar estabelecimento:", error);
    res.status(500).json({ message: "Erro interno ao buscar ou criar estabelecimento." });
  }
});

export default router;
