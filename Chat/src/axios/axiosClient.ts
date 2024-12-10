import axios from 'axios'
export const client = axios.create({
    baseURL: "https://chat-server-zgn7.onrender.com/api/v1",
    timeout:10000
})

// export const client = axios.create({
//     baseURL: "http://10.175.0.148:3000/api/v1",
//     timeout:10000
// })

