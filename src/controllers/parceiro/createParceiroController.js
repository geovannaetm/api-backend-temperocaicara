import bcrypt from 'bcrypt';
import {
  createParceiro,
  getParceiroByEmail,
} from "../../models/parceiroModel.js";

export const createParceiroController = async (req, res) => {
  try {
    const { email, nome, cpf, pass } = req.body;

    if (!email || !nome || !cpf || !pass) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos obrigatórios." });
    }

    const exist = await getParceiroByEmail(email);
    if (exist) {
      return res.status(409).json({ message: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const novo = await createParceiro({
      email,
      nome,
      cpf,
      pass: hashedPassword
    });

    return res.status(201).json({
      message: "Parceiro criado com sucesso.",
      data: {
        id: novo.id_adm,
        nome: novo.nome,
        email: novo.email,
        cpf: novo.cpf
      }
    });
  } catch (error) {
    console.error("Erro criar parceiro:", error);
    return res.status(500).json({ message: "Erro interno ao criar parceiro." });
  }
};
