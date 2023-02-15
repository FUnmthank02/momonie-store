import connectMongo from "@/config/connect";
import { getCategories } from "@/controllers/categoryController";

export default function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({error: 'error connection'}))

    const method = req.method

    switch (method) {
        case 'GET':
            getCategories(req, res)
            break
        default:
            res.setHeader('Allow', ['GET methods'])
            res.status(405).end(`Method ${method} not allowed`)
            break
    }
}