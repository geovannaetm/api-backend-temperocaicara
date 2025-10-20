import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const createEstabelecimento = async (data) => {
  return await prisma.estabelecimentos.create({ data });
};

export const getEstabelecimentoById = async (id) => {
  return await prisma.estabelecimentos.findUnique({ where: { id: Number(id) } });
};

export const getAllEstabelecimentos = async () => {
  return await prisma.estabelecimentos.findMany();
};

export const updateEstabelecimento = async (id, data) => {
  return await prisma.estabelecimentos.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteEstabelecimento = async (id) => {
  return await prisma.estabelecimentos.delete({ where: { id: Number(id) } });
};
