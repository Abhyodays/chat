import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage'
import { DB_NAME } from '../constants/db';
import { ChatUser } from '../types/ChatUser';

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
    created_at TEXT
    );
    `
    const chatUserQuery = `
    CREATE TABLE IF NOT EXISTS chat_users (
        id TEXT NOT NULL PRIMARY KEY,
        latest_message TEXT,
        latest_message_time TEXT
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
    const query = `INSERT OR REPLACE INTO chat_users (id, latest_message, latest_message_time) VALUES (?, ?, ?)`
    try {
        const res = await db.executeSql(query, [chatUser.id, chatUser.latestMessage, chatUser.latestMessageTime])
    } catch (error) {
        console.log("Error :: addChatUser :: ", error)
    }

}

const addMessage = async(db:SQLiteDatabase,data:Message) =>{
    const {sender, receiver, id, message, created_at } = data
    const query = 
    ` INSERT INTO Messages (sender, receiver, message, created_at,id) VALUES(?,?,?,?,?);`
    await db.executeSql(query, [sender, receiver,message, created_at, id ] )

}
const getAllMessages = async(db:SQLiteDatabase)=>{
    const query = 
    `
     SELECT * FROM Messages ORDER BY created_at DESC;
    `
    const messages: Message[] = []
    const results = await db.executeSql(query)
    results?.forEach((result) => {
      for (let index = 0; index < result.rows.length; index++) {
        messages.push(result.rows.item(index))
      }
    })
    return messages;
}
const getAllMessagesOfUser = async(db:SQLiteDatabase, id:string)=>{
    const query = 
    `SELECT * FROM Messages WHERE sender=? OR receiver=? ORDER BY created_at DESC`
    const messages: Message[] = []
    const results = await db.executeSql(query,[id,id])
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
export {connectToDatabase,createTables, addMessage, getAllMessages, resetTable, getAllMessagesOfUser, updateChatUser}