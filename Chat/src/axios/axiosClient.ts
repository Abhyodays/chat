import axios from 'axios'
export const client = axios.create({
    baseURL: "https://chat-server-zgn7.onrender.com/api/v1",
    timeout:5000
})

// export const client = axios.create({
//     baseURL: "http://10.175.1.56:3000/api/v1",
//     timeout:10000
// })

