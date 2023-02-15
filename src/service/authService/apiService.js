import axios from "axios"
import { BASE_URL, AUTH_LOGIN_ENDPOINT } from '@/ultilities/constant/apiUrl'

/* handle login */
export const login = async (userData) => {
    const res = await axios.post(`${BASE_URL}${AUTH_LOGIN_ENDPOINT}`, userData)
    return res.data
}