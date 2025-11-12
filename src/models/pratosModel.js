import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();


export async function getAllPratos() {
  return await prisma.pratos.findMany({
    include: { estabelecimentos: true },
  });
}

export async function getPratoById(id) {
  return await prisma.pratos.findUnique({
    where: { id: Number(id) },
    include: { estabelecimentos: true },
  });
}

export async function createPrato(data) {
  return await prisma.pratos.create({ data });
}

export async function updatePrato(id, data) {
  return await prisma.pratos.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deletePrato(id) {
  return await prisma.pratos.delete({
    where: { id: Number(id) },
  });
}

export async function getPratosByEstabelecimento(estabelecimentos_id) {
  return await prisma.pratos.findMany({
    where: { estabelecimentos_id: Number(estabelecimentos_id) },
    include: { estabelecimentos: true },
    orderBy: { id: "desc" },
  });
}