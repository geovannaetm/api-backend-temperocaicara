import { Router } from "express";
import {
  getOrCreateCartController,
  getCartItemsController,
  addItemToCartController,
  updateCartItemController,
  removeItemFromCartController,
  clearCartController,
} from "../controllers/cart/cartControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me", authMiddleware, getOrCreateCartController);
router.get("/:cartId/items", authMiddleware, getCartItemsController);
router.post("/:cartId/items", authMiddleware, addItemToCartController);
router.put("/:cartId/items/:pratosId", authMiddleware, updateCartItemController);
router.delete("/:cartId/items/:pratosId", authMiddleware, removeItemFromCartController);
router.delete("/:cartId/clear", authMiddleware, clearCartController);

export default router;
