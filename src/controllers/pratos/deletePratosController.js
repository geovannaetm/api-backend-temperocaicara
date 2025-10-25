import { deletePrato } from "../../models/pratosModel.js";

export const deletePratosController = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePrato(id);
    res.status(200).json({ message: "Prato deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar prato:", error);
    res.status(500).json({ error: "Erro ao deletar prato" });
  }
};
