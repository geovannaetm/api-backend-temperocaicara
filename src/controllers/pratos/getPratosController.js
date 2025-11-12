import { getAllPratos, getPratoById, getPratosByEstabelecimento } from "../../models/pratosModel.js";

export const getPratosController = async (req, res) => {
  try {
    const { id } = req.params;
    const { estabelecimentos_id } = req.query;

    let pratos;

    if (id) {
      pratos = await getPratoById(id);
    } else if (estabelecimentos_id) {
      pratos = await getPratosByEstabelecimento(parseInt(estabelecimentos_id));
    } else {
      pratos = await getAllPratos();
    }

    res.status(200).json(pratos);
  } catch (error) {
    console.error("Erro ao buscar pratos:", error.message, error);
    res.status(500).json({ error: "Erro ao buscar pratos" });
  }
};