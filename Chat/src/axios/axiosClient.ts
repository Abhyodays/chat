import axios from 'axios'
export const client = axios.create({
    baseURL: "https://chat-server-zgn7.onrender.com/api/v1",
    timeout:10000
})