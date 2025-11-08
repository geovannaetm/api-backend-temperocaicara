import bcrypt from 'bcrypt';
import { updateUser } from "../../models/userModel.js";

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, email, pass, bairro, rua, numero } = req.body;

    // Criptografar nova senha se fornecida
    if (pass) {
      pass = await bcrypt.hash(pass, 10);
    }

    const updated = await updateUser(id, { name, email, pass, bairro, rua, numero });
    res.status(200).json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      bairro: updated.bairro,
      rua: updated.rua,
      numero: updated.numero
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};