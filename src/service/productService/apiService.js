import axios from "axios"
import { BASE_URL, PRODUCT_ENDPOINT } from '@/ultilities/constant/apiUrl'

/* get data of all products */
export const getAllProducts = async () => {
    const res = await axios.get(`${BASE_URL}${PRODUCT_ENDPOINT}`)
    return res.data
}

/* get data of a product */
export const getSingleProduct = async (productId) => {
    const res = await axios.get(`${BASE_URL}${PRODUCT_ENDPOINT}/${productId}`)
    return res.data
}

/* add product */
export const addProduct = async (data) => {
    const res = await axios.post(`${BASE_URL}${PRODUCT_ENDPOINT}`, data)
    return res.data
}

/* update a product */
export const updateProduct = async (productId, data) => {
    const res = await axios.put(`${BASE_URL}${PRODUCT_ENDPOINT}?productId=${productId}`, data)
    return res.data
}

/* delete a product */
export const deleteAProduct = async (productId) => {
    const res = await axios.delete(`${BASE_URL}${PRODUCT_ENDPOINT}?productId=${productId}`)
    return res.data
}