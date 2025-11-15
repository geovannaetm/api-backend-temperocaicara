import { getEstabelecimentoById } from "../../models/estabelecimentoModel.js";
import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();

export const deleteEstabelecimentoController = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await getEstabelecimentoById(id);
    if (!exists) {
      return res.status(404).json({ message: "Estabelecimento não encontrado." });
    }

    //  pratos vinculados
    await prisma.pratos.deleteMany({
      where: { estabelecimentos_id: Number(id) },
    });

    //  o estabelecimento
    await prisma.estabelecimentos.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Estabelecimento e pratos deletados com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar estabelecimento:", error);
    return res.status(500).json({ message: "Erro interno ao deletar estabelecimento." });
  }
};