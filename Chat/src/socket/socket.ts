import {io} from 'socket.io-client'
export const socket = io("https://chat-server-zgn7.onrender.com",{transports:['websocket']})