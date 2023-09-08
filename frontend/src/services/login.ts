import axios from "axios";
const baseUrl = '/api/login'

type LoginDataProp = {
    username: string,
    password: string
}

export const login = async (data: LoginDataProp) => {
    return await axios.post(baseUrl, data)
}