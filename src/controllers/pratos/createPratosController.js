import { createPrato } from "../../models/pratosModel.js";
import { getEstabelecimentoById } from "../../models/estabelecimentoModel.js";

export const createPratosController = async (req, res) => {
  try {
    const data = req.body;

    // Verifica se o estabelecimento existe
    const est = await getEstabelecimentoById(data.estabelecimentos_id);
    if (!est) return res.status(404).json({ message: "Estabelecimento não encontrado." });

    // Verifica se o estabelecimento pertence ao adm logado
    const admId = req.user?.id; // ← se estiver usando JWT com middleware
    if (admId && est.adm_id_adm !== admId) {
      return res.status(403).json({ message: "Você não tem permissão para criar pratos neste estabelecimento." });
    }

    const newPrato = await createPrato(data);
    res.status(201).json(newPrato);
  } catch (error) {
    console.error("Erro ao criar prato:", error);
    res.status(500).json({ error: "Erro ao criar prato" });
  }
};