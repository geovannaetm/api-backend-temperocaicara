import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const createParceiro = async (data) => {
  return await prisma.adm.create({ data });
};

export const getParceiroByEmail = async (email) => {
  return await prisma.adm.findUnique({
    where: { email },
    select: {
      id_adm: true,
      nome: true,
      email: true,
      cpf: true,
      pass: true 
    }
  });
};

export const getParceiroById = async (id) => {
  return await prisma.adm.findUnique({ where: { id_adm: Number(id) } });
};

export const getAllParceiros = async () => {
  return await prisma.adm.findMany();
};

export const updateParceiro = async (id, data) => {
  return await prisma.adm.update({
    where: { id_adm: Number(id) },
    data,
  });
};

export const deleteParceiro = async (id) => {
  // Deletar estabelecimentos que esta vinculado
  await prisma.estabelecimentos.deleteMany({ where: { adm_id_adm: Number(id) } });
  return await prisma.adm.delete({ where: { id_adm: Number(id) } });
};
