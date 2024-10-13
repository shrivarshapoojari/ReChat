
import { User } from "../models/user.model.js";
import { emitEvent, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.model.js";
import {Request} from "../models/request.model.js";
import cloudinary from "cloudinary"
import fs from 'fs/promises'
import { NEW_REQUEST } from "../constants/events.js";
import { uploadToCloudinary } from "../utils/features.js";
const cookieOptions = {
  maxAge:0,
  sameSite:"none",
  httpOnly:true,
  secure:true
}
const newUser = async (req, res,next) => {
  try {
    const { name, username, password, bio } = req.body;
 
   
    if (!name || !username || !password || !bio || !req.file) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const user = await User.create({
      name: name,
      username: username,
      password: password,
      avatar: {
        public_id: username,
        url: "htts://www.google.com",
      },
    });
     
             

    if(req.file)
      {
        try{
              const result = await cloudinary.v2.uploader.upload(req.file.path ,{
               folder:'rechat',
               width:250,
               height:250,
               gravity:'faces',
               crop:'fill'
              })
   
              if(result)
              {
                  user.avatar.public_id=result.public_id;
                  user.avatar.url=result.secure_url;
                   
   
                  
                  fs.rm(`uploads/${req.file.filename}`)
   
   
              }
              await user.save();
   
        }
   
       
        catch(e){
             return next(new ErrorHandler(e.message,500))
        }

   
      }











     

    // Create a new user
     

    sendToken(res, user, 201, "User Created");
  } catch (error) {
    console.error(error);
     return next (new ErrorHandler(error.message,500))
  }
};

const login = async (req, res,next) => {
  try {
    const { username, password } = req.body;
    

    // Check if all required fields are provided
    if (!username || !password) {
     return  res.status(400).json({ success: false, message: "Username and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
    return  res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    // Compare the provided password with the stored one
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
     return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    sendToken(res, user, 201, `Welcome Back ${user.name}`);
  } catch (error) {
    console.error(error);
   return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getMyProfile = async (req, res,next) => {
    try {
      const user = await User.findById(req.user).select("-password");
       
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" }); // Stop further execution with return
      }
  
 
      return res.status(200).json({ success: true, user });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };
 
   
  const logout = async (req, res) => {
    return res.status(200).cookie("rechat-token", "", cookieOptions).json({ success: true, message: "Logged out" });
  }

  const searchUser=async(req,res,next)=>{
try{
    const {name=""}=req.query;
    if(!name)
    {
      return next(new ErrorHandler("Name is required",400))

    }



    const myChats= await Chat.find({groupChat:false,members:req.user})

    const allUserFrommyChat=myChats.flatMap(chat=>chat.members)
    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUserFrommyChat }, // Exclude users from chat
      name: { $regex: name, $options: "i" } // Search by name with case-insensitive matching
    });
    


const users=allUsersExceptMeAndFriends.map(({_id,name,avatar})=>(
  {_id,
    name,
    avatar:avatar.url
    }))



return res.status(200).json({success:true,users})

  }
  catch(error)
  {
    return next(new ErrorHandler(error.message,500))
  }

  }

  const sendRequest=async(req,res,next)=>{
    try{

    
           const {userId}=req.body;
           if(!userId)
           {
             return next(new ErrorHandler("User id is required",400))
           }

           const request =await Request.findOne({
            $or: [
              {sender:req.user,receiver:userId},
              {receiver:req.user,sender:userId}
            ]
           })
           if(request)
           {
             return next(new ErrorHandler("Request already sent",400))
           }
            const newRequest=await Request.create({
              
              sender:req.user,
              receiver:userId
            })
            emitEvent(req,"request",[userId])
              await  newRequest.save()
            return res.status(201).json({success:true,message:"Friend Request sent"})
          }catch(error)
          {
            return next(new ErrorHandler(error.message,500))
          }
  }  

  const acceptRequest = async(req,res,next)=>{
    const {requestId,accept}=req.body;

    if(!requestId)
    {
      return next(new ErrorHandler("Request id is required",400))
    }
    
    try{
      const request=await Request.findById(requestId).populate("sender","name").populate("receiver","name")
      if(!request)
      {
        return next(new ErrorHandler("Request not found",404))
      }
      if(request.receiver._id.toString()!==req.user.toString())
      {
        return next(new ErrorHandler("You are not authorized to accept this request",403))
      }

      if (!accept) {
        await request.deleteOne();
    
        return res.status(200).json({
          success: true,
          message: "Friend Request Rejected",
        });
      }
    
      const members = [request.sender._id, request.receiver._id];
    
      await Promise.all([
        Chat.create({
          members,
          name: `${request.sender.name}-${request.receiver.name}`,
        }),
        request.deleteOne(),
      ]);
    
      emitEvent(req, REFETCH_CHATS, members);
    
      return res.status(200).json({
        success: true,
        message: "Friend Request Accepted",
        senderId: request.sender._id,
      });

    }
    catch(error)
    {
      return next(new ErrorHandler(error.message,500))
    }
  }


  const getMyNotifications = async (req, res,next) => 
    {

    try
    
        {

    
            const requests = await Request.find({ receiver: req.user }).populate(
              "sender",
              "name avatar"
            );
          
            const allRequests = requests.map(({ _id, sender }) => ({
              _id,
              sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar.url,
              },
            }));
  
    return res.status(200).json({
      success: true,
      allRequests,
    });
  }
  catch(error)
  {
    return next(new ErrorHandler(error.message,500))
  }
}
 

const getMyFriends =  async(req, res,next) => {
  try{
    const chatId = req.query.chatId;
  
    const chats = await Chat.find({
      members: req.user,
      groupChat: false,
    }).populate("members", "name avatar");
  
    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMember(members, req.user);
  
      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });
  
    if (chatId) {
      const chat = await Chat.findById(chatId);
  
      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );
  
      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      return res.status(200).json({
        success: true,
        friends,
      });
    }
  }catch(error)
  {
    return next(new ErrorHandler(error.message,500))
  }
  };
export { login, newUser,getMyProfile,logout,searchUser,sendRequest,acceptRequest ,getMyNotifications,getMyFriends};
