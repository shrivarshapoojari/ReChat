import express from "express"
import userRoutes from  "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import { connectDB } from "./utils/features.js"; 
import { errorMiddleware } from "./middlewares/error.middleware.js";
dotenv.config();
const app =express();
const PORT=process.env.PORT || 3000;


connectDB(process.env.MONGO_URI);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/user",userRoutes);

app.get("/",(req,res)=>{
    res.send("Alive at 3000")
})
app.use(errorMiddleware)
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})