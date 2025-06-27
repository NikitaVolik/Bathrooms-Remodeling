import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/users.js"
import serviceRouter from "./routes/services.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/services", serviceRouter)

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})