import { updatePrato } from "../../models/pratosModel.js";

export const updatePratosController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const pratoAtualizado = await updatePrato(id, data);
    res.status(200).json(pratoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar prato:", error);
    res.status(500).json({ error: "Erro ao atualizar prato" });
  }
};
