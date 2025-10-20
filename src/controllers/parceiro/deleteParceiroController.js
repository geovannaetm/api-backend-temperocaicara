import { deleteParceiro, getParceiroById } from "../../models/parceiroModel.js";

export const deleteParceiroController = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await getParceiroById(id);
    if (!exists) return res.status(404).json({ message: "Parceiro não encontrado." });

    await deleteParceiro(id);
    return res.status(200).json({ message: "Parceiro e estabelecimentos associados deletados." });
  } catch (error) {
    console.error("Erro deletar parceiro:", error);
    return res.status(500).json({ message: "Erro interno ao deletar parceiro." });
  }
};
