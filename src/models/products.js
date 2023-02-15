import { Schema, models, model } from "mongoose"

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    origin: String,
    discount: String,
    image: [String],
    link: String,
})

const Products = models.products || model('products', productSchema)
export default Products