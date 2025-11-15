import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export async function getOrCreateCartByUser(userId) {
  const cart = await prisma.cart.findFirst({ where: { user_id: Number(userId) } });
  if (cart) return cart;
  return await prisma.cart.create({ data: { user_id: Number(userId) } });
}

export async function getCartItems(cartId) {
  return await prisma.cart_has_pratos.findMany({
    where: { cart_id_cart: Number(cartId) },
    include: { pratos: true },
  });
}

export async function addItemToCart(cartId, pratosId, quantidade = 1) {
  const existing = await prisma.cart_has_pratos.findUnique({
    where: {
      cart_id_cart_pratos_id: {
        cart_id_cart: Number(cartId),
        pratos_id: Number(pratosId),
      },
    },
  });

  if (existing) {
    return await prisma.cart_has_pratos.update({
      where: { cart_id_cart_pratos_id: { cart_id_cart: Number(cartId), pratos_id: Number(pratosId) } },
      data: { quantidade: existing.quantidade + Number(quantidade) },
    });
  }

  return await prisma.cart_has_pratos.create({
    data: { cart_id_cart: Number(cartId), pratos_id: Number(pratosId), quantidade: Number(quantidade) },
  });
}

export async function updateCartItem(cartId, pratosId, quantidade) {
  if (Number(quantidade) <= 0) return await removeItemFromCart(cartId, pratosId);
  return await prisma.cart_has_pratos.update({
    where: { cart_id_cart_pratos_id: { cart_id_cart: Number(cartId), pratos_id: Number(pratosId) } },
    data: { quantidade: Number(quantidade) },
  });
}

export async function removeItemFromCart(cartId, pratosId) {
  return await prisma.cart_has_pratos.delete({
    where: { cart_id_cart_pratos_id: { cart_id_cart: Number(cartId), pratos_id: Number(pratosId) } },
  });
}

export async function clearCart(cartId) {
  return await prisma.cart_has_pratos.deleteMany({ where: { cart_id_cart: Number(cartId) } });
}
