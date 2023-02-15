import axios from "axios"
import { BASE_URL, CATEGORY_ENDPOINT } from '@/ultilities/constant/apiUrl'

/* get data of all categories */
export const getAllCategories = async () => {
    const res = await axios.get(`${BASE_URL}${CATEGORY_ENDPOINT}`)
    return res.data
}