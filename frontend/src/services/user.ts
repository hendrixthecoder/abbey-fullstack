import axios from "axios"
const baseUrl = '/api/users'

export const fetchUser = async (token?: string, username?: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    return await axios.get(`${baseUrl}/${username}`, config)
}

export const updateUser = async (data: object, token?: string) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    return await axios.put(`${baseUrl}/edit`, data, config)
}

