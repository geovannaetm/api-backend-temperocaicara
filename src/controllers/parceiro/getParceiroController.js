import { getAllParceiros, getParceiroById } from "../../models/parceiroModel.js";

export const getParceiroController = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const parceiro = await getParceiroById(id);
      if (!parceiro) return res.status(404).json({ message: "Parceiro não encontrado." });
      return res.status(200).json(parceiro);
    }
    const list = await getAllParceiros();
    return res.status(200).json(list);
  } catch (error) {
    console.error("Erro buscar parceiro:", error);
    return res.status(500).json({ message: "Erro interno ao buscar parceiro." });
  }
};
