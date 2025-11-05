import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const create = async (userData) => {
  return await prisma.user.create({
    data: userData,
    select: {
      id: true,
      name: true,
      email: true,
      bairro: true,
      rua: true,
      numero: true
    }
  });
};


export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id: Number(id) } });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
