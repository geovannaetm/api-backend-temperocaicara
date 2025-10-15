import express from 'express'

import cors from 'cors'



const app = express()
const port = 3333

app.use(cors())

app.use(express.json())


//routers.....

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
