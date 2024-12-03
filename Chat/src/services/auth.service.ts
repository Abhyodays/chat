import { AxiosError } from "axios";
import { client } from "../axios/axiosClient"

const loginUser = async(email:string, password:string) =>{
    try {
        const res = await client.post('/users/login', {email, password})
        return res.data.data;

    } catch (error) {
        const message = error instanceof AxiosError? error.message : "Something went wrong"
        console.log("Error :: Login:",message ); 
        throw new Error(message)
    }
}

export {loginUser}