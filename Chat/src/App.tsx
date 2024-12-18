import { useCallback, useEffect } from "react";
import AuthProvider from "./context/authContext";
import Router from "./router/Router";
import { connectToDatabase, createTables } from "./db/db";
import { SocketContextProvider } from "./context/SocketContext";
import { socket } from "./socket/socket";

const App = () => {

    const loadData = useCallback(async () => {
        try {
            const db = await connectToDatabase();
            await createTables(db)
        } catch (error) {
            console.log("Error while initiating database:", error);
        }
    }, [])

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            console.log("socket get connected.")
        })
        socket.on('disconnect', () => {
            console.log("socket get disconnected")
        })
        socket.on('reconnect', () => {
            console.log("socket get reconnected.")
        })
        loadData();
        return (() => {
            socket.disconnect();
        })
    }, [])
    return (
        <SocketContextProvider>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </SocketContextProvider>
    )
}

export default App;