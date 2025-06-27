import express from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import User from "../models/User.js"

const router = express.Router()

router.post("/:userId", verifyToken, async (req, res) => {
    try {
        const userId = req.params.userId

        if (req.user.userId != userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Нет прав для просмотра этого профиля' })
        }

        const user = await User.findById(userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }

        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
})

export default router