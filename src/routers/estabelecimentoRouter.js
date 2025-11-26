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
    
    let est = await prisma.estabelecimentos.findFirst({
      where: { adm_id_adm: admId },
    });

   
    if (!est) {
      est = await prisma.estabelecimentos.create({
        data: {
          nome: "Novo Estabelecimento",
          decricao: "Descrição...",
          numero: "Nº00",
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

// buscar pedidos do estabelecimento
router.get("/:id/pedidos", async (req, res) => {
  const estId = parseInt(req.params.id);

  try {
    const pedidos = await prisma.order.findMany({
      include: {
        order_has_pratos: {
          include: { pratos: true }
        }
      }
    });

    // apenas pedidos e pratos do estabelecimento
    const pedidosDoEst = pedidos.filter(p =>
      p.order_has_pratos.some(item => item.pratos.estabelecimentos_id === estId)
    );

    res.json(pedidosDoEst);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});


export default router;
