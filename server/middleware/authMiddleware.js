import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Невалидный токен' })
            }

            req.user = decoded
            next()
        })
    } else {
        return res.status(401).json({ message: 'Токен отсутствует' })
    }
}

export { verifyToken }