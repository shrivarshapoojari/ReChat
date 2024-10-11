import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
 
dotenv.config();

const cookieOptions = {
    maxAge:24*60*60*1000,
    sameSite:"none",
    httpOnly:true,
    secure:true
}
const connectDB = async (uri) => {
  try {
    // Wait for the mongoose connection to complete
    const response = await mongoose.connect(uri, { dbName: "Rechat" });

    // Log success message if connected
    console.log(`MongoDB connected: ${response.connection.host}`);
  } catch (error) {
    // Handle connection error
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process with failure code
    process.exit(1);
  }
};

 



const sendToken =(res,user,code,message)=>{

      const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
      });
      return res.status(code).cookie("rechat-token",token,cookieOptions
       
      ).json({
        success:true,
        message,
    
      });
}



const emitEvent=(req,event,users,data)=>{
console.log("Emitting event",event)
}

const deleteFilesFromCloudinary =async (public_ids)=>{}



export {connectDB,sendToken,emitEvent,deleteFilesFromCloudinary,cookieOptions}
