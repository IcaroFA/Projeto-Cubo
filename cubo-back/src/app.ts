import express, { application } from "express"
import cors from "cors"

export const app = express()

app.use(express.json())
app.use(cors())

app.listen(3001, () => console.log(`Servidor conectado na porta 3001.`)) 