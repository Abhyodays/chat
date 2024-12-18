import { createContext, useContext, useEffect, useState } from "react";
import { ReturnKeyType } from "react-native";
import socketio from "socket.io-client";


const getSocket = () => {
    return socketio("https://chat-server-zgn7.onrender.com", { transports: ['websocket'] })
}
const SocketContext = createContext<{
    socket: ReturnType<typeof socketio> | null
}>({ socket: null });

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context == null) {
        throw new Error("Component must be wrapped in SocketProvider");
    }
    return context;
}

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null);
    useEffect(() => {
        setSocket(getSocket());
    }, [])
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}
