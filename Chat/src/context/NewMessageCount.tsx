import { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "./authContext";

type ContextType = {
    increaseCount: (user: string) => void;
    clearCount: (user: string) => void;
    getCount: (user: string) => number;
}
const NewMessageCountContext = createContext<ContextType | null>(null);
export const useNewMessageCount = () => {
    const context = useContext(NewMessageCountContext);
    if (!context) {
        throw new Error("useNewMessageCount must be wrapped in NewMessageCountProvider");
    }
    return context;
}
export const NewMessageCountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [newMessagesCount, setNewMessagesCount] = useState<Map<string, number>>(new Map());
    const { state: auth } = useAuth();
    const increaseCount = (username: string) => {
        newMessagesCount.set(username, (newMessagesCount.get(username) || 0) + 1);
        setNewMessagesCount(new Map(newMessagesCount));
    }
    const clearCount = (username: string) => {
        newMessagesCount.delete(username);
    }
    const getCount = (user: string) => {
        return (newMessagesCount.get(user) || 0);
    }
    return (
        <NewMessageCountContext.Provider value={{ increaseCount, clearCount, getCount }}>
            {children}
        </NewMessageCountContext.Provider>
    )
}
