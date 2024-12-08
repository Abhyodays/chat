import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage'
import { DB_NAME } from '../constants/db';

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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT NOT NULL,
    receiver TEXT,
    message TEXT,
    created_at TEXT
    );
    `
    try {
        await db.executeSql(MessageQuery)
    } catch (error) {
        console.log("Error in Database::createTables::", error);
        throw new Error("Not able to create table");
    }
}

const addMessage = async(db:SQLiteDatabase,message:Message) =>{
    const query = 
    ` INSERT INTO Messages (sender, receiver, message, created_at) VALUES(?,?,?,?);`
    await db.executeSql(query, [message.sender,message.receiver,message.message,message.created_at] )

}
const getAllMessages = async(db:SQLiteDatabase)=>{
    const query = 
    `
     SELECT * FROM Messages;
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
const resetTable = async(db:SQLiteDatabase)=>{
    const query = 
    `DELETE FROM Messages;`;
    await db.executeSql(query);
}
export {connectToDatabase,createTables, addMessage, getAllMessages, resetTable}