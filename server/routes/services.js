import express from "express"
import Service from "../models/Service.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const { category } = req.query

        let filter = {}
        if (category) {
            filter = { category: category }
        }

        const services = await Service.find(filter)
        res.json(services)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка при получении списка услуг' })
    }
})

router.post("/", async (req, res) => {
    try {
        const newService = new Service(req.body)
        await newService.save()
        res.status(201).json(newService)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка при добавлении услуги' })
    }
})

export default router