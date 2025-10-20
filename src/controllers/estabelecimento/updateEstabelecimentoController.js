import { updateEstabelecimento, getEstabelecimentoById } from "../../models/estabelecimentoModel.js";

export const updateEstabelecimentoController = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const exists = await getEstabelecimentoById(id);
    if (!exists) return res.status(404).json({ message: "Estabelecimento não encontrado." });

    const updated = await updateEstabelecimento(id, payload);
    return res.status(200).json({ message: "Estabelecimento atualizado.", data: updated });
  } catch (error) {
    console.error("Erro atualizar estabelecimento:", error);
    return res.status(500).json({ message: "Erro interno ao atualizar estabelecimento." });
  }
};
