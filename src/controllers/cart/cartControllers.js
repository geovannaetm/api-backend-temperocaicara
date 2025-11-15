import {
  getOrCreateCartByUser,
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
} from "../../models/cartModel.js";

export const getOrCreateCartController = async (req, res) => {
  try {
    const userId = req.user.id; // vem do token
    const cart = await getOrCreateCartByUser(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter/criar carrinho." });
  }
};

export const getCartItemsController = async (req, res) => {
  try {
    const { cartId } = req.params;
    const items = await getCartItems(cartId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar itens do carrinho." });
  }
};

export const addItemToCartController = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { pratos_id, quantidade = 1 } = req.body;
    const item = await addItemToCart(cartId, pratos_id, quantidade);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar item ao carrinho." });
  }
};

export const updateCartItemController = async (req, res) => {
  try {
    const { cartId, pratosId } = req.params;
    const { quantidade } = req.body;
    const item = await updateCartItem(cartId, pratosId, quantidade);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar item do carrinho." });
  }
};

export const removeItemFromCartController = async (req, res) => {
  try {
    const { cartId, pratosId } = req.params;
    await removeItemFromCart(cartId, pratosId);
    res.json({ message: "Item removido." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover item." });
  }
};

export const clearCartController = async (req, res) => {
  try {
    const { cartId } = req.params;
    await clearCart(cartId);
    res.json({ message: "Carrinho limpo." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao limpar carrinho." });
  }
};
