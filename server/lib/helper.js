import e from "express";
import { userSocketId } from "../app.js";

export const getOtherMember = (members, userId) => {
     members.filter(member => member._id.toString() !== userId.toString());
}


export const getSockets=(users=[])=>{
      

     const sockets=users.map((user)=>userSocketId.get(user._id.toString()))
     return sockets;
}

export const getBase64 = (file) => {
     return new Promise((resolve, reject) => {
       try {
         const base64String = Buffer.from(file).toString('base64');
         resolve(`data:${file.mimetype};base64,${base64String}`);
       } catch (error) {
         reject(error);
       }
     });
   };
   