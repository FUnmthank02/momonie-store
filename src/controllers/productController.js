
import Products from "@/models/products"

export async function getProducts(req, res) {
    try {
        const products = await Products.find({})
        if (!products) return res.status(404).json({ error: 'Data not found' })
        res.status(200).json(products)

    } catch (e) {
        res.status(404).json({ error: 'Error when fetching data' })
    }
}

export async function getSingleProduct(req, res) {
    try {
        const { productId } = req.query
        if (productId) {
            const product = await Products.findById(productId)
            if(product)
                res.status(200).json(product)
            else res.status(404).json({ error: 'Product not found' })
        }
        res.status(404).json({ error: 'Product not found' })
    } catch (e) {
        res.status(404).json({ error: e.message })
    }
}

export async function postProduct(req, res) {
    try {
        const formData = req.body
        if (!formData) return res.status(404).json({ error: 'Data not found' })
        Products.create(formData, (err, data) => {
            return res.status(200).json(data)
        })

    } catch (e) {
        res.status(404).json({ error: 'Error when post data' })
    }
}

export async function putProduct(req, res) {
    try {
        const { productId } = req.query
        const formData = req.body
        if (productId && formData) {
            await Products.findByIdAndUpdate(productId, formData)
            res.status(200).json(formData)
        }
        res.status(404).json({ error: 'User not selected...!' })

    } catch (e) {
        res.status(404).json({ error: 'Error when put data' })
    }
}

export async function deleteProduct(req, res) {
    try {
        const { productId } = req.query
        if (productId) {
            await Products.findByIdAndDelete(productId)
            res.status(200).json({ delete: productId })
        }
        res.status(404).json({ error: 'User not selected...!' })

    } catch (e) {
        res.status(404).json({ error: 'Error when delete data' })
    }
}