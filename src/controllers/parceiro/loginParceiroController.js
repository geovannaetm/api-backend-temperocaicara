import { getParceiroByEmail } from "../../models/parceiroModel.js";

export const loginParceiroController = async (req, res) => {
  try {
    const { email, pass } = req.body;
    if (!email || !pass) return res.status(400).json({ message: "Email e senha são obrigatórios." });

    const parceiro = await getParceiroByEmail(email);
    if (!parceiro) return res.status(404).json({ message: "Parceiro não encontrado." });

    if (parceiro.pass !== pass) return res.status(401).json({ message: "Senha incorreta." });

   
    return res.status(200).json({ message: "Login realizado com sucesso.", data: parceiro });
  } catch (error) {
    console.error("Erro login parceiro:", error);
    return res.status(500).json({ message: "Erro interno no login." });
  }
};
