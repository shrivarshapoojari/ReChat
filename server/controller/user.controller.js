import { User } from "../models/user.model.js"
const newUser= async(req,res)=>{
    const avatar={

        public_id:"a",
        url:"a"
    }
      await  User.create({name:"",username:"",password:"",avatar:avatar})


      res.status(201).json({message:"Registration Completed"})
}
const  login=(req,res)=>{
    res.send("hello")
}

export {login,newUser};
