import axios from "axios"
const baseUrl = '/api/transactions'

export const fetchAllTransactions = async (token?: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    return await axios.get(`${baseUrl}`, config)
}

export const createNewTransaction = async (data: object, token?: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    return await axios.post(`${baseUrl}/new`, data, config)
}