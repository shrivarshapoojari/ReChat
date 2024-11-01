import express from "express"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import { connectDB } from "./utils/features.js"; 
import { Server } from "socket.io";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import {createServer} from "http"
import {v4 as uuid} from "uuid"
import{ v2 as cloudinary} from "cloudinary"
import { socketAuthenticator } from "./middlewares/auth.middleware.js";
import userRoutes from  "./routes/user.routes.js";
import chatRoutes from  "./routes/chats.routes.js";
import adminROutes from "./routes/admin.routes.js"
import { ALERT, NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING ,STOP_TYPING} from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";

import cors from "cors";
dotenv.config();
const app =express();
const server=createServer(app)
 
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true,
    },
    methods:["GET","POST","PUT","DELETE"]
});
app.set("io",io)

const PORT=process.env.PORT || 3000;







const  userSocketId=new Map();


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
connectDB(process.env.MONGO_URI);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors(
    {
        origin:["http://localhost:5173","http://localhost:3000","https://rechaat.vercel.app"],
        credentials:true,
    }
))
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/chats",chatRoutes);
app.use("/api/v1/admin",adminROutes)
app.get("/",(req,res)=>{
    res.send("Alive at 3000")
})

io.use((socket, next) => {
    cookieParser()(
      socket.request,
      socket.request.res,
      async (err) => await socketAuthenticator(err, socket, next)
    );
  });
try{

io.on("connection",(socket)=>{
    const user=socket.user
      
    
    userSocketId.set(user._id.toString(),socket.id)
      
     socket.on(NEW_MESSAGE,async({chatId,members,message})=>{

        const messageForRealTime={
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name,
                avatar:user.avatar
            },
            chatId:chatId,
            createdAt:new Date().toISOString(),
        }

        const memberSocket=getSockets(members)
        io.to(memberSocket).emit(NEW_MESSAGE,{chatId,message:messageForRealTime})
        io.to(NEW_MESSAGE_ALERT,{chatId})
        // console.log("New message",messageForRealTime)
        const messageForDB={
            content:message,
            sender:user._id,
            chat:chatId
        }
        await Message.create(messageForDB);
     })
    
     socket.on(START_TYPING,({members,chatId})=>{
        const memberSocket=getSockets(members)
        socket.to(memberSocket).emit(START_TYPING,{chatId})

     })
     socket.on(STOP_TYPING,({members,chatId})=>{
        const memberSocket=getSockets(members)
        socket.to(memberSocket).emit(STOP_TYPING,{chatId})

     })
    socket.on("disconnect",()=>{
        
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