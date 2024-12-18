import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage'
import { DB_NAME } from '../constants/db';
import { ChatUser } from '../types/ChatUser';
import { User } from '../types/User';
import { getUserDetails } from '../services/user.service';

enablePromise(true);
let dbInstance:SQLiteDatabase|null = null;
const connectToDatabase = async():Promise<SQLiteDatabase>=>{
    if(!dbInstance){
        dbInstance = openDatabase({
            name:DB_NAME,location:'default'
        },
        ()=>{},
        (error)=>{
            console.log("Error in connecting database:", error);
            throw new Error(error.message)
        })
    }
    return dbInstance;
}

const createTables = async(db:SQLiteDatabase)=>{
    const MessageQuery = `
    CREATE TABLE IF NOT EXISTS Messages (
    id TEXT NOT NULL PRIMARY KEY,
    sender TEXT NOT NULL,
    receiver TEXT,
    message TEXT,
    author TEXT NOT NULL,
    created_at TEXT
    );
    `
    const chatUserQuery = `
    CREATE TABLE IF NOT EXISTS chat_users (
        id TEXT NOT NULL PRIMARY KEY,
        latest_message TEXT,
        latest_message_time TEXT,
        author TEXT NOT NULL
    )
    `
    try {
        await db.executeSql(MessageQuery)
        await db.executeSql(chatUserQuery)
    } catch (error) {
        console.log("Error in Database::createTables::", error);
        throw new Error("Not able to create table");
    }
}

const updateChatUser = async(db:SQLiteDatabase, chatUser:ChatUser ) =>{
    const query = `INSERT OR REPLACE INTO chat_users (id, latest_message, latest_message_time, author) VALUES (?, ?, ?,?)`
    try {
        const {id, latestMessage, latestMessageTime, author} = chatUser;
        await db.executeSql(query, [id, latestMessage, latestMessageTime, author])
    } catch (error) {
        console.log("Error :: updateChatUser :: ", error)
        throw error;
    }

}

const getAllChatUsers = async(db:SQLiteDatabase, author:string)=>{
    const query = `
    SELECT * FROM chat_users WHERE author = ? ORDER BY latest_message_time ASC;
    `
    const chatUsers:ChatUser[] = [];
    try {
        const results = await db.executeSql(query, [author]);
    
        results?.forEach(res => {
            for(let i=0; i<res.rows.length; i++){
                chatUsers.push(res.rows.item(i));
            }
        })
        return chatUsers;
    } catch (error) {
        console.log("Error :: getAllChatUsers :: ", error);
        throw error;
    }
}

const addMessage = async(db:SQLiteDatabase,data:Message) =>{
    const {sender, receiver, id, message, created_at, author } = data;
    const query = 
    `INSERT OR REPLACE INTO Messages (sender, receiver, message, created_at, id, author) VALUES(?,?,?,?,?,?);`
    try {
        await db.executeSql(query, [sender, receiver,message, created_at, id,author ] )
    } catch (error) {
        console.log("Error :: addMessage :: ", error)
    }

}

const getAllMessagesOfUser = async(db:SQLiteDatabase, author:string, user:string)=>{
    const query = `
        SELECT * 
        FROM Messages
        WHERE author=? AND (sender=? OR receiver=?)
        ORDER BY created_at DESC;
    `;
    const messages: Message[] = []
    const results = await db.executeSql(query,[author, user, user])
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        messages.push(result.rows.item(index))
      }
    })
    return messages;
}
const resetTable = async(db:SQLiteDatabase)=>{
    const query = 
    `DELETE FROM Messages;`;
    await db.executeSql(query);
}
export 
{
connectToDatabase,
createTables,
addMessage,
resetTable,
getAllMessagesOfUser,
updateChatUser,
getAllChatUsers
}