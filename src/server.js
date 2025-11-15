import express from 'express'
import cors from 'cors'
import userRouter from "./routers/userRouter.js";
import parceiroRouter from "./routers/parceiroRouter.js";
import estabelecimentoRouter from "./routers/estabelecimentoRouter.js";
import pratosRouter from "./routers/pratosRouter.js";
import authRouter from "./routers/authRouter.js";

import cartRoutes from "./routers/cartRoutes.js";
import orderRoutes from "./routers/orderRouters.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";




const app = express()
const port = 3333

app.use(cors())

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// Rotas
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api/parceiro", parceiroRouter);
app.use("/api/estabelecimentos", estabelecimentoRouter);
app.use("/api/pratos", pratosRouter);

// Rotas novas (protegidas com JWT)
app.use("/api/cart", authMiddleware, cartRoutes);
app.use("/api/orders", authMiddleware, orderRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
