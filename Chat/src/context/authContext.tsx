import { createContext, Dispatch, FC, ReactNode, useContext, useEffect, useReducer } from "react";
import { AuthState } from "../types/AuthState";
import { AuthDispatch, initialState, loadState } from "./actions/auth.action";
import reducer from "./reducers/auth.reducer";

type authContextType = {
    state: AuthState;
    dispatch: AuthDispatch
}
const AuthContext = createContext<authContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        loadState(dispatch);
    }, [])
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
