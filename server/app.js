import express from "express"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import { connectDB } from "./utils/features.js"; 
import { Server } from "socket.io";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import {createServer} from "http"
import {v4 as uuid} from "uuid"

dotenv.config();
const app =express();
const server=createServer(app)
const io=new Server(server,{})
const PORT=process.env.PORT || 3000;

import userRoutes from  "./routes/user.routes.js";
import chatRoutes from  "./routes/chats.routes.js";
import adminROutes from "./routes/admin.routes.js"
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";




const  userSocketId=new Map();



connectDB(process.env.MONGO_URI);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/user",userRoutes);
app.use("/chat",chatRoutes);
app.use("/admin",adminROutes)
app.get("/",(req,res)=>{
    res.send("Alive at 3000")
})

io.use((socket,next)=>{})

try{

io.on("connection",(socket)=>{
     console.log("user connected",socket.id)
    const user={
        _id:"ad",
        name:"aqada"
    }
    userSocketId.set(user._id.toString(),socket.id)

     socket.on(NEW_MESSAGE,async({chatId,members,message})=>{

        const messageForRealTime={
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name,
            },
            chatId:chatId,
            createdAt:new Date().toISOString(),
        }

        const memberSocket=getSockets(members)
        io.to(memberSocket).emit(NEW_MESSAGE,{chatId,message:messageForRealTime})
        io.to(NEW_MESSAGE_ALERT,{chatId})
        console.log("New message",messageForRealTime)
        const messageForDB={
            content:message,
            sender:user._id,
            chat:chatId
        }
        await Message.create(messageForDB);
     })
    socket.on("disconnect",()=>{
        console.log("user disconnected")
        userSocketId.delete(user._id.toString())
    })
})
}catch(error)
{
console.log(error)
}
app.use(errorMiddleware)
server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})

export {userSocketId}