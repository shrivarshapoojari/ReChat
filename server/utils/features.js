import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
 import { v2 as cloudinary } from "cloudinary";
 import { v4 as uuid } from "uuid";
 import { getSockets } from "../lib/helper.js";
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





 
// const uploadFilesToCloudinary = async (files = []) => {
//   console.log(files)
//   const uploadPromises = files.map((file) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(
//         getBase64(file),
//         {
//           resource_type: "auto",
//           public_id: uuid(),
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//     });
//   });

//   try {
//     const results = await Promise.all(uploadPromises);
        
//     const formattedResults = results.map((result) => ({
//       public_id: result.public_id,
//       url: result.secure_url,
//     }));
//     return formattedResults;
//   } catch (err) {
//     console.log(err)
//     throw new Error("Error uploading files to cloudinary", err);
//   }
// };

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      // Detect the resource type based on MIME type
      const resourceType = getResourceType(file.mimetype);

      cloudinary.uploader.upload(
        file.path, // Use file path or buffer instead of Base64 for videos/audios
        {
          resource_type: resourceType,
          public_id: uuid(), // Unique public ID
          timeout: 120000, // Set timeout (2 minutes)
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
    console.log(err);
    throw new Error("Error uploading files to Cloudinary", err);
  }
};

// Helper function to detect resource type based on MIME type
const getResourceType = (mimetype) => {
  if (mimetype.startsWith("video")) {
    return "video";
  } else if (mimetype.startsWith("audio")) {
    return "raw";
  } else {
    return "auto";  
  }
};
const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const usersSocket = getSockets(users);
  io.to(usersSocket).emit(event, data);
};



const deleteFilesFromCloudinary=()=>{

}
export {connectDB,sendToken,emitEvent,deleteFilesFromCloudinary,cookieOptions,uploadFilesToCloudinary}
