import axios from "axios"
import { BASE_URL, SEARCH_CATEGORY_ENDPOINT } from '@/ultilities/constant/apiUrl'

/* get data of all categories */
export const getProductsByCategory = async (categoryName) => {
    const res = await axios.get(`${BASE_URL}${SEARCH_CATEGORY_ENDPOINT}/${categoryName}`)
    return res.data
}