import { getAllPratos, getPratoById } from "../../models/pratosModel.js";

export const getPratosController = async (req, res) => {
  try {
    const { id } = req.params;
    const pratos = id ? await getPratoById(id) : await getAllPratos();
    res.status(200).json(pratos);
  } catch (error) {
    console.error("Erro ao buscar pratos:", error);
    res.status(500).json({ error: "Erro ao buscar pratos" });
  }
};
