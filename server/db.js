import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI
        if (!mongoURI) {
            throw new Error('MongoDB не определена в .env файле')
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('MongoDB подключена')

        const collections = await mongoose.connection.db.listCollections().toArray()
        console.log(collections.map(c => c.name))
    } catch (error) {
        console.error('Ошибка подключения к MongoDB', error.message)
        process.exit(1)
    }
}

export default connectDB