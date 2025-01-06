import axios from 'axios'
export const client = axios.create({
    baseURL: "https://chat-server-zgn7.onrender.com/api/v1",
    timeout:5000
})

// export const client = axios.create({
//     baseURL: "http://10.0.2.2:3000/api/v1",
//     timeout:5000
// })

