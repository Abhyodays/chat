import { AuthState } from "../../types/AuthState";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGIN, LOGOUT, LOAD_STATE } from "../action.types";
import { Dispatch } from "react";

export const initialState:AuthState = {
    accessToken:null,
    user: null,
    isLoggedIn:false,
    refreshToken:null
}

export type AuthDispatch = Dispatch<{
    type:string, 
    payload?:AuthState
}>
const loadState = async(dispatch:AuthDispatch)=>{
    try {
        const value = await AsyncStorage.getItem('authState');
        if(value){
            const authState = JSON.parse(value);
            dispatch({type:LOAD_STATE, payload:authState})
        }else{
            dispatch({type:LOAD_STATE, payload:initialState})
        }
    } catch (error) {
        console.error("Failed to fetch auth state from storage:", error);
        dispatch({type:LOAD_STATE, payload:initialState})
    }
}

const login = async(dispatch:AuthDispatch, data:AuthState) =>{
    try {
        const isLoggedIn = !!data.user?.email
        data = {...data, isLoggedIn}
        const stringifiedState = JSON.stringify(data);
        await AsyncStorage.setItem('authState', stringifiedState);
        dispatch({type:LOGIN, payload:data})
    } catch (error) {
        console.error("Failed to save data in storage:", error)
    }
}

const logout = async(dispatch:AuthDispatch) =>{
    try {
        await AsyncStorage.removeItem('authState');
        dispatch({type:LOGOUT, payload:initialState})
    } catch (error) {
        console.error("Failed to remove data from storage:", error);
    }
}

export {loadState, login, logout};