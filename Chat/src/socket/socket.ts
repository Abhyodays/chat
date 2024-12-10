import {io} from 'socket.io-client'
export const socket = io("https://chat-server-zgn7.onrender.com",{transports:['websocket']})

// export const socket = io("http://10.175.0.148:3000",{transports:['websocket']})