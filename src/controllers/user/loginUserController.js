/* import { getUserByEmail } from "../../models/userModel.js";

export const loginUserController = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

    if (user.pass !== pass) return res.status(401).json({ error: "Senha incorreta." });

    res.status(200).json({ message: "Login bem-sucedido", user });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
};
 */