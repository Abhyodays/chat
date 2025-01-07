import { useCallback, useEffect } from "react";
import AuthProvider from "./context/authContext";
import Router from "./router/Router";
import { connectToDatabase, createTables } from "./db/db";
import { SocketContextProvider } from "./context/SocketContext";
import { socket } from "./socket/socket";
import { NewMessageCountProvider } from "./context/NewMessageCount";

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
        // const handleError = (data: { message: string }) => {
        //     console.log("socket error:", data.message);
        // };
        // socket.connect();
        // socket.on('connect', () => {
        //     console.log("socket get connected.")
        // })
        // socket.on("error", handleError);
        loadData();
        // return (() => {
        //     socket.disconnect();
        // })
    }, [])
    return (
        <SocketContextProvider>
            <AuthProvider>
                <NewMessageCountProvider>
                    <Router />
                </NewMessageCountProvider>
            </AuthProvider>
        </SocketContextProvider>
    )
}

export default App;