import { getUserById, getAllUsers } from "../../models/userModel.js";

export const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await getUserById(id);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
      return res.status(200).json(user);
    }
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};
