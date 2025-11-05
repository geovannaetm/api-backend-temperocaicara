import { createUser } from "../../models/userModel.js";
import bcrypt from "bcrypt";

export const createUserController = async (req, res) => {
  try {
    const { name, email, pass, bairro, rua, numero } = req.body;

    if (!name || !email || !pass) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios." });
    }

    
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Criar usuário no banco com a senha já criptografada
    const newUser = await createUser({
      name,
      email,
      pass: hashedPassword,
      bairro,
      rua,
      numero,
    });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
};
