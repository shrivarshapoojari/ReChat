import { userSocketId } from "../app.js";

export const getOtherMember = (members, userId) => {
     members.filter(member => member._id.toString() !== userId.toString());
}


export const getSockets=(users=[])=>{
      

     const sockets=users.map((user)=>userSocketId.get(user._id.toString()))
     return sockets;
}