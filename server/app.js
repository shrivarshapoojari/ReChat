import express from "express"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import { connectDB } from "./utils/features.js"; 

import { errorMiddleware } from "./middlewares/error.middleware.js";
dotenv.config();
const app =express();
const PORT=process.env.PORT || 3000;

import userRoutes from  "./routes/user.routes.js";
import chatRoutes from  "./routes/chats.routes.js";
import adminROutes from "./routes/admin.routes.js"







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
app.use(errorMiddleware)
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})