import { emitEvent } from '../utils/features.js';
import { Chat } from '../models/chat.model.js';
import { ALERT, REFETCH_CHATS } from '../constants/events.js';
import { getOtherMember } from '../lib/helper.js';
import { ErrorHandler } from '../utils/utility.js';
import { User } from '../models/user.model.js';
const newGroupChat = async (req, res, next) => {
    try {
        const { name, members } = req.body;
        console.log(req.body);
        console.log("MEMBERS:", members);

        // Check if required fields are provided
        if (!name || !members) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Ensure group chat has at least 2 members
        if (members.length < 2) {
            return res.status(400).json({ success: false, message: "Group chat must have at least 2 members" });
        }

        // Add the current user to the members list
        const allMembers = [...members, req.user];

        // Create the group chat
        const chat = await Chat.create({
            name,
            groupChat: true,
            creator: req.user,
            members: allMembers
        });

        // Emit events for chat creation and chat refresh
        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
        emitEvent(req, REFETCH_CHATS, members);

        return res.status(201).json({ success: true, message: "Group chat created" });

    } catch (error) {
        console.error("Error creating group chat:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getMyChats = async (req, res) => {
    try {
      const chats = await Chat.find({ members: req.user }).populate(
        "members",
        "name avatar"
      );
  
      const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
        const otherMember = getOtherMember(members, req.user);
  
        return {
          _id,
          groupChat,
          avatar: groupChat
            ? members.slice(0, 3).map(({ avatar }) => avatar.url)
            : [otherMember.avatar.url],
          name: groupChat ? name : otherMember.name,
          members: members.reduce((prev, curr) => {
            if (curr._id.toString() !== req.user.toString()) {
              prev.push(curr._id);
            }
            return prev;
          }, []),
        };
      });
  
      return res.status(200).json({
        success: true,
        chats: transformedChats,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
  

const getMyGroups=async(req,res,next)=>
  {

    try{

    

  const chats=await Chat.find({
    members:req.user,
    groupChat:true,
    creator:req.user
  }).populate("members","name avatar")

  const groups = chats.map(({ members, _id, groupChat, name }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success:true,
    groups
  })
}catch (error)
{ 
  console.log(error)
  return res.status(400).json({
      success:false,
      message:error
  })
}
  
}


const addMembers=async(req,res,next)=>{
    try{

    
  const {chatId, members}=req.body;
  if(!members || members.length<=0)
    return next(new ErrorHandler("Please provide memebers",400))
  const chat =await Chat.findById(chatId);
  console.log(chat)
  if(!chat)
  {
    return next(new ErrorHandler("Chat not found",404))
  }
  if(!chat.groupChat)
    return next(new ErrorHandler("Not a group chat",400))

   
  if(chat.creator.toString()!=req.user.toString())
  {
    return next(new ErrorHandler("Unauthoized to create group",403))
  }
  const allNewMembersPromise=members.map((i)=>User.findById(i,"name"))

  const allNewMembers=await Promise.all(allNewMembersPromise)
  const uniqueMembers=allNewMembers.filter(
    (i)=>!chat.members.includes(i._id.toString())
  ).map((i)=>i._id)

  chat.members.push(...uniqueMembers)

  if(chat.members.length>2048)
  {
    return next(new ErrorHandler("Maximum member limit excedded",400))
  }
  await chat.save();

  const allUsersname=allNewMembers.map((i)=>i.name).join(",")

  emitEvent(req,ALERT,chat.members,`${allUsersname} has been added to ${chat.name} group` )

  emitEvent(req,REFETCH_CHATS,chat.members);

  return res.status(200).json({
    success:true,
    message:"Members added successfully"
  })
    }catch (error)
    {
      console.log(error)
      return next(new ErrorHandler(error.message,500))
    }

}
export { newGroupChat, getMyChats,getMyGroups,addMembers};
