import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config();
import { User } from "../models/user.model.js";
const adminSecretKey=process.env.ADMIN_KEY
const isAuthentificated = (req, res, next) => {


const token=req.cookies['rechat-token'];

if(!token){
    return next(new ErrorHandler("Login to access this resource",401));
}
try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    
    req.user=decoded.id;
 
    next();
} catch (error) {   
    return next(new ErrorHandler("error",401));
}


 
}


const adminOnly = (req, res, next) => {
    const token = req.cookies["rechat-admin-token"];
  
    if (!token)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  
    const isMatched = secretKey === adminSecretKey;
  
    if (!isMatched)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    next();
  };
  

  const socketAuthenticator =async(err,socket,next)=>{
 
try{

  if(err)
  {
    return next(new ErrorHandler(err,500))


    
  }

  const authToken=socket.request.cookies["rechat-token"]
  
  if(!authToken)
  {
    return next(new ErrorHandler("Authentication failed please login",500))


  }

  const decodedData=jwt.verify(authToken,process.env.JWT_SECRET)
   
   if(!decodedData)
    return next(new ErrorHandler("Authentication failed",500))
  socket.user =await User.findById(decodedData.id)
 
  return next();
}catch(error)
{
  return next(new ErrorHandler("Connection failed",500))
}

  }



export {isAuthentificated,adminOnly,socketAuthenticator}