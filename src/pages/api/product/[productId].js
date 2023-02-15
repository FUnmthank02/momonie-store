import connectMongo from "@/config/connect";
import { getSingleProduct } from "@/controllers/productController";

export default function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({error: 'error connection'}))

    const method = req.method

    switch (method) {
        case 'GET':
            getSingleProduct(req, res)
            break
        default:
            res.setHeader('Allow', ['GET methods'])
            res.status(405).end(`Method ${method} not allowed`)
            break
    }
}