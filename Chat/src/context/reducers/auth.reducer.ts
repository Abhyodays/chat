import { ThemeProvider } from "@react-navigation/native";
import { LOAD_STATE, LOGIN, LOGOUT } from "../action.types";
import { initialState } from "../actions/auth.action";
import { AuthState } from "../../types/AuthState";

const reducer = (state=initialState, action:{type:string, payload?:AuthState}) =>{
    switch(action.type){
        case LOAD_STATE:
            return {...state, ...action.payload}
        case LOGIN:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...state, ...action.payload}
        default:
            throw new Error("Invalid action")
    }
}

export default reducer;