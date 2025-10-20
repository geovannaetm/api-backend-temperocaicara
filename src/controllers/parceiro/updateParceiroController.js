import { updateParceiro, getParceiroById } from "../../models/parceiroModel.js";

export const updateParceiroController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const exists = await getParceiroById(id);
    if (!exists) return res.status(404).json({ message: "Parceiro não encontrado." });

    const updated = await updateParceiro(id, payload);
    return res.status(200).json({ message: "Parceiro atualizado.", data: updated });
  } catch (error) {
    console.error("Erro atualizar parceiro:", error);
    return res.status(500).json({ message: "Erro interno ao atualizar parceiro." });
  }
};
