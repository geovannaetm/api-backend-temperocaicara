import { createOrderFromCart, getOrdersByUser, getOrderById, deleteOrdersByUser } from "../../models/orderModel.js";

export const createOrderFromCartController = async (req, res) => {
  try {
    const { cartId } = req.params;
    const userId = req.user.id; // vem do token
    const order = await createOrderFromCart(cartId, userId);
    res.status(201).json({ message: "Pedido criado.", order });
  } catch (error) {
    res.status(500).json({ message: error.message || "Erro ao criar pedido." });
  }
};

export const getOrdersByUserController = async (req, res) => {
  try {
    const userId = req.user.id; // vem do token
    const orders = await getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar pedidos." });
  }
};

export const getOrderByIdController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    if (!order) return res.status(404).json({ message: "Pedido não encontrado." });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter pedido." });
  }
};

export const deleteOrdersByUserController = async (req, res) => {
  try {
    const userId = req.user.id; 
    await deleteOrdersByUser(userId);
    res.json({ message: "Todos os pedidos foram apagados com sucesso." });
  } catch (error) {
    res.status(500).json({ message: error.message || "Erro ao apagar pedidos." });
  }
};
