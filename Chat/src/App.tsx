import { useCallback, useEffect } from "react";
import AuthProvider from "./context/authContext";
import Router from "./router/Router";
import { addMessage, connectToDatabase, createTables, getAllMessages, resetTable } from "./db/db";

const App = () => {

    const loadData = useCallback(async () => {
        try {
            const db = await connectToDatabase();
            await createTables(db)
            const results = await getAllMessages(db);
        } catch (error) {
            console.log("Error while initiating database:", error);
        }
    }, [])

    useEffect(() => {
        loadData();
    }, [])
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}

export default App;