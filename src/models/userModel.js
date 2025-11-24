
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
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      pass: true // necessário para bcrypt.compare
    }
  });
};


export const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: Number(id) },
    data,
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

export const deleteUser = async (id) => {
   const userId = Number(id);

  // Apaga pedidos
  await prisma.order.deleteMany({
    where: { user_id: userId },
  });

  // Apaga carrinhos 
  await prisma.cart.deleteMany({
    where: { user_id: userId },
  });

  //apagar o usuário
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
