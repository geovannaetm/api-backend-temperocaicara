import express from 'express'
import cors from 'cors'
import userRouter from "./routers/userRouter.js";


const app = express()
const port = 3333

app.use(cors())

app.use(express.json())


// Rotas
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
