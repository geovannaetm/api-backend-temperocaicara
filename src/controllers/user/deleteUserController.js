import { deleteUser } from "../../models/userModel.js";

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
};
