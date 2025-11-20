import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export async function createOrderFromCart(cartId, userId) {
  return await prisma.$transaction(async (tx) => {
    const items = await tx.cart_has_pratos.findMany({
      where: { cart_id_cart: Number(cartId) },
      include: { pratos: true },
    });

    if (items.length === 0) throw new Error("Carrinho vazio.");

    const order = await tx.order.create({ data: { user_id: Number(userId) } });

    for (const item of items) {
      await tx.order_has_pratos.create({
        data: {
          order_id_order: order.id_order,
          pratos_id: item.pratos_id,
          quantidade: item.quantidade,
        },
      });
    }

    await tx.cart_has_pratos.deleteMany({ where: { cart_id_cart: Number(cartId) } });

    return order;
  });
}

export async function getOrdersByUser(userId) {
  return await prisma.order.findMany({
    where: { user_id: Number(userId) },
    include: { order_has_pratos: { include: { pratos: true } } },
    orderBy: { id_order: "desc" },
  });
}

export async function getOrderById(orderId) {
  return await prisma.order.findUnique({
    where: { id_order: Number(orderId) },
    include: { user: true, order_has_pratos: { include: { pratos: true } } },
  });
}

export async function deleteOrdersByUser(userId) {
  return await prisma.$transaction(async (tx) => {
    // Primeiro apaga os vínculos de pratos com pedidos
    await tx.order_has_pratos.deleteMany({
      where: { order: { user_id: Number(userId) } },
    });

    // Depois apaga os pedidos
    await tx.order.deleteMany({
      where: { user_id: Number(userId) },
    });
  });
}
