import { getAllEstabelecimentos, getEstabelecimentoById } from "../../models/estabelecimentoModel.js";

export const getEstabelecimentoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const est = await getEstabelecimentoById(id);
      if (!est) return res.status(404).json({ message: "Estabelecimento não encontrado." });
      return res.status(200).json(est);
    }
    const list = await getAllEstabelecimentos();
    return res.status(200).json(list);
  } catch (error) {
    console.error("Erro buscar estabelecimento:", error);
    return res.status(500).json({ message: "Erro interno ao buscar estabelecimento." });
  }
};
