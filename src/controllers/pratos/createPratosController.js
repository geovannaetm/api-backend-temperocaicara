import { createPrato } from "../../models/pratosModel.js";

export const createPratosController = async (req, res) => {
  try {
    const data = req.body;
    const newPrato = await createPrato(data);
    res.status(201).json(newPrato);
  } catch (error) {
    console.error("Erro ao criar prato:", error);
    res.status(500).json({ error: "Erro ao criar prato" });
  }
};
