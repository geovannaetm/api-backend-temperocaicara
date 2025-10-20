import { deleteEstabelecimento, getEstabelecimentoById } from "../../models/estabelecimentoModel.js";

export const deleteEstabelecimentoController = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await getEstabelecimentoById(id);
    if (!exists) return res.status(404).json({ message: "Estabelecimento não encontrado." });

    await deleteEstabelecimento(id);
    return res.status(200).json({ message: "Estabelecimento deletado." });
  } catch (error) {
    console.error("Erro deletar estabelecimento:", error);
    return res.status(500).json({ message: "Erro interno ao deletar estabelecimento." });
  }
};
