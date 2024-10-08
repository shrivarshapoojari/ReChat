import { User } from "../models/user.model.js"
import {sendToken} from "../utils/features.js"

const newUser= async(req,res)=>{
    const avatar={

        public_id:"a",
        url:"a"
    }

    const {name,username,password,bio}=req.body;
    console.log(req.body)
     const user= await  User.create({
        name,
        bio,
        username,
        password,
        avatar,})

        sendToken(res,user,201,"User Created")
      res.status(201).json({message:"Registration Completed"})
}
const  login=(req,res)=>{
    res.send("hello")
}

export {login,newUser};
