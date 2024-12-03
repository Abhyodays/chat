import { User } from "./User"

export type AuthState  = {
    user:User|null;
    isLoggedIn:boolean
    accessToken:string|null;
    refreshToken:string|null;
}