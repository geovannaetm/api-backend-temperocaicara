import { Router } from "express";
import {
  createOrderFromCartController,
  getOrdersByUserController,
  getOrderByIdController,
  deleteOrdersByUserController,
} from "../controllers/order/orderControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Criar pedido a partir do carrinho do usuário logado
router.post("/from-cart/:cartId", authMiddleware, createOrderFromCartController);

// Listar todos os pedidos do usuário logado
router.get("/my-orders", authMiddleware, getOrdersByUserController);

// Detalhar um pedido específico
router.get("/:orderId", authMiddleware, getOrderByIdController);

router.delete("/my-orders", authMiddleware, deleteOrdersByUserController);

export default router;
