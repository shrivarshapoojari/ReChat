import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
 import { v2 as cloudinary } from "cloudinary";
 import { v4 as uuid } from "uuid";
 import { getBase64 } from "../lib/helper.js";
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

 
const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};



const deleteFilesFromCloudinary=()=>{

}
export {connectDB,sendToken,emitEvent,deleteFilesFromCloudinary,cookieOptions,uploadFilesToCloudinary}
