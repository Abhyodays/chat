import axios from 'axios'
export const client = axios.create({
    baseURL: process.env.BASE_URI,
    timeout:2000
})