import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../../models/userModel.js';
import { getParceiroByEmail } from '../../models/parceiroModel.js';

export const loginController = async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
  }

  try {
    // Tenta encontrar como user
    const user = await getUserByEmail(email);

    // Se não for user, tenta como parceiro (adm)
    const parceiro = !user ? await getParceiroByEmail(email) : null;

    if (!user && !parceiro) {
      return res.status(401).json({ message: "Email ou senha inválido (email não encontrado)." });
    }

    const entity = user || parceiro;
    const isPasswordValid = await bcrypt.compare(pass, entity.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha inválido (senha incorreta)." });
    }

    const tipoUser = user ? 'user' : 'parceiro';

    const token = jwt.sign(
      {
        id: user ? user.id : parceiro.id_adm,
        email: entity.email,
        tipoUser
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      tipoUser,
      profile: user
        ? {
            id: user.id,
            name: user.name,
            email: user.email
          }
        : {
            id: parceiro.id_adm,
            nome: parceiro.nome,
            email: parceiro.email,
            cpf: parceiro.cpf
          },
      token
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno ao tentar fazer login." });
  }
};
