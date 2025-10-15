import { createUser } from "../../models/userModel.js";

export const createUserController = async (req, res) => {
  try {
    const { name, email, pass, bairro, rua, numero } = req.body;

    if (!name || !email || !pass) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    const newUser = await createUser({ name, email, pass, bairro, rua, numero });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
};
