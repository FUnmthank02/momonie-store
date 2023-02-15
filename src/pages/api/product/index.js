
import connectMongo from "@/config/connect"
import { getProducts, postProduct, putProduct, deleteProduct } from "@/controllers/productController";

export default function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({error: 'error connection'}))

    const method = req.method
    switch (method) {
        case 'GET':
            getProducts(req, res)
            break
        case 'POST':
            postProduct(req, res)
            break
        case 'PUT':
            putProduct(req, res)
            break
        case 'DELETE':
            deleteProduct(req, res)
            break
        default:
            res.setHeader('Allow', ['GET, POST, PUT, DELETE methods'])
            res.status(405).end(`Method ${method} not allowed`)
            break
    }
}