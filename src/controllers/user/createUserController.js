import { create } from '../../models/userModel.js';
import bcrypt from 'bcrypt';

export const createUserController = async (req, res) => {
  try {
    const { name, email, pass, bairro, rua, numero } = req.body;

    if (!name || !email || !pass) {
      return res.status(400).json({ error: "Preencha os campos obrigatórios." });
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = await create({
      name,
      email,
      pass: hashedPassword,
      bairro,
      rua,
      numero
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: newUser
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar usuário." });
  }
};
