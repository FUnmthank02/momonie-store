
import connectMongo from "@/config/connect";
import { handleLogin } from "@/controllers/authController";

export default function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({error: 'error connection'}))

    const method = req.method

    switch (method) {
        case 'POST':
            handleLogin(req, res)
            break
        default:
            res.setHeader('Allow', ['GET methods'])
            res.status(405).end(`Method ${method} not allowed`)
            break
    }
}