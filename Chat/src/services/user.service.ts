import { client } from "../axios/axiosClient"
import { User } from "../types/User";
import { ChatUser } from "../types/ChatUser";

const getUserDetails = async(userId:string):Promise<User> =>{
    const res= await client.get(`/users/find?id=${userId}`);
    return res.data.data;
}
const getUsers = async(query:string):Promise<User[]> =>{
    try {
        const res = await client.get(`/users/all?id=${query}`);
        const users:User[] =  res.data.data;
        return users;
    } catch (error) {
        console.log("Error :: getUsers :", error);
        throw error
    }
}
const loadChatUsersDetails = async (chatUsers: ChatUser[]) => {
    try {
        return await Promise.all(
            chatUsers.map((cu): Promise<User> => getUserDetails(cu.id))
        )
    } catch (error) {
        console.log("Error :: loadChatUsersDetails :", error);
        throw error
    }
}


export {getUserDetails, getUsers, loadChatUsersDetails};