
import Products from "@/models/products"

export async function getCategories(req, res) {
    try {
        const categories = await Products.find().distinct("category")
        if (!categories) return res.status(404).json({ error: 'Data not found' })
        res.status(200).json(categories)

    } catch (e) {
        res.status(404).json({ error: 'Error when fetching data' })
    }
}