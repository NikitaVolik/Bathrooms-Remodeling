import express from "express"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

dotenv.config()

const router = express.Router()
const SECRET_KEY = process.env.JWT_SECRET

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка регистрации' })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Неверный email или пароль' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неверный email или пароль' })
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' })
        res.json({ token, userId: user._id, username: user.username })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка авторизации' })
    }
})

export default router