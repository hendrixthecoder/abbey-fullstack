import axios from "axios"
const baseUrl = 'api/friends'

export const fetchAllFriends = async (username: string | undefined) => {
    return await axios.get(`${baseUrl}/${username}`)
}