
import Products from "@/models/products"

export async function getProductsByCategory(req, res) {
    try {
        const { categoryName } = req.query
        const products = await Products.find({'category': categoryName})
        if (!products) return res.status(404).json({ error: 'Data not found' })
        res.status(200).json(products)

    } catch (e) {
        res.status(404).json({ error: 'Error when fetching data' })
    }
}