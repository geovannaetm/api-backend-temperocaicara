import { createEstabelecimento } from "../../models/estabelecimentoModel.js";
import { getParceiroById } from "../../models/parceiroModel.js";

export const createEstabelecimentoController = async (req, res) => {
  try {
    const { nome, decricao, logo_url, numero, adm_id_adm } = req.body;

    if (!nome || !decricao || !adm_id_adm || !numero) {
      return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
    }

    // checar 
    const adm = await getParceiroById(adm_id_adm);
    if (!adm) return res.status(404).json({ message: "Adm (parceiro) não encontrado." });

    const novo = await createEstabelecimento({ nome, decricao, logo_url, numero, adm_id_adm: Number(adm_id_adm) });
    return res.status(201).json({ message: "Estabelecimento criado com sucesso.", data: novo });
  } catch (error) {
    console.error("Erro criar estabelecimento:", error);
    return res.status(500).json({ message: "Erro interno ao criar estabelecimento." });
  }
};
