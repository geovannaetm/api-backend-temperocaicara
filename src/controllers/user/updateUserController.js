import { updateUser } from "../../models/userModel.js";

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, pass, bairro, rua, numero } = req.body;

    const updated = await updateUser(id, { name, email, pass, bairro, rua, numero });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};
