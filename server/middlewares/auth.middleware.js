import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken';

const isAuthentificated = (req, res, next) => {


const token=req.cookies['rechat-token'];

if(!token){
    return next(new ErrorHandler("Login to access this resource",401));
}
try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    
    req.user=decoded.id;
    console.log("id:",req.user)
    next();
} catch (error) {   
    return next(new ErrorHandler("error",401));
}


 
}


export {isAuthentificated}