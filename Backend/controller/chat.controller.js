import { emitEvent,deleteFilesFromCloudinary } from '../utils/features.js';
import { Chat } from '../models/chat.model.js';
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from '../constants/events.js';
import { getOtherMember } from '../lib/helper.js';
import { ErrorHandler } from '../utils/utility.js';
import { User } from '../models/user.model.js';
import { Message } from '../models/message.model.js';
import { uploadFilesToCloudinary } from '../utils/features.js';
import { NEW_MESSAGE } from '../constants/events.js';
const reChatId="6724e043c70a25cc301c807a"  //production
// const reChatId="671290503f1e1f83fdb29bed"   //dev
const newGroupChat = async (req, res, next) => {
    try {
        const { name, members } = req.body;
         
       

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

 
const getChatHeader= async(req,res,next)=>{
  try{
    const userId=req.user;
    const chatId=req.params.id;
    
    const chat=await Chat.findById(chatId).populate("members","name avatar")
    
    if(!chat)
    {
      return next(new ErrorHandler("Chat not found",404))
    }
    if(chat.groupChat)
    {
        return res.status(200).json({
          chatName:chat.name,
          members:chat.members,
          creator:chat.creator
          

        })
    }
    else{
      const otherMember=chat.members.find(member=>member._id.toString()!=userId.toString())
    
      return res.status(200).json({
        chatName:otherMember.name,
        members:[otherMember],
         
      })

    }
        
      

    // const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    //   const otherMember = getOtherMember(members, req.user);

    //   return {
    //     _id,
    //     groupChat,
    //     avatar: groupChat
    //       ? members.slice(0, 3).map(({ avatar }) => avatar?.url)
    //       : [otherMember?.avatar?.url],
    //     name: groupChat ? name : otherMember.name,
    //     members: members.reduce((prev, curr) => {
    //       if (curr._id.toString() !== req.user.toString()) {
    //         prev.push(curr._id);
    //       }
    //       return prev;
    //     }, []),
    //   };
    // });

    // return res.status(200).json({
    //   success: true,
    //   chats: transformedChats,
    // });
      

  } catch(error)
  {
    return next(new ErrorHandler(error.message,500))
  }
 

}
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
            ? members.slice(0, 3).map(({ avatar }) => avatar?.url)
            : [otherMember?.avatar?.url],
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
      console.error("Error fetching chats:", error);
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

  emitEvent(req,ALERT,chat.members,{message:`${allUsersname} has been added to ${chat.name} group` ,chatId,members:chat.members})
  const messageForDB={
    content:`${allUsersname} has been added to ${chat.name} group`,
    sender:reChatId,
    chat:chatId
}
await Message.create(messageForDB);
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


const removeMember=async(req,res,next)=>{
try{
   
  const {userId,chatId}=req.body;
 
  if(!userId || !chatId)
    return next(new ErrorHandler("All fields are required",400))
      
        const chat =await Chat.findById(chatId);
        const userTobeRemoved= await User.findById(userId)
       
if(!userTobeRemoved)
{
  return next(new ErrorHandler("User not found",404))
}  
 
        const memberExists = chat.members.some(member => member.toString() === userId.toString());

        if (!memberExists) {
          return next(new ErrorHandler("memeber not there in group", 400));
        }
        
  if(!chat)
  {
    return next(new ErrorHandler("Chat not found",404))
  }
  if(!chat.groupChat)
    return next(new ErrorHandler("Not a group chat",400))

   
  if(chat.creator.toString()!=req.user.toString())
  {
    return next(new ErrorHandler("Unauthoized to remove member",403))
  }

      if(chat.members.length<=3){
        return next(new ErrorHandler("Group must have atleast 3 members"))

      }

       
      const allChatMembers=chat.members.map((i)=>i.toString())

      chat.members=chat.members.filter((member)=>member.toString()!=userId.toString())
      await  chat.save();
 
      const messageForDB={
        content:`${userTobeRemoved.name} has been removed from the group`,
        sender:reChatId,
        chat:chatId
    }
    await Message.create(messageForDB);
      emitEvent(req, ALERT, chat.members, {
        message: `${userTobeRemoved.name} has been removed from the group`,
        chatId,
        members: chat.members,
      });

      emitEvent(req,REFETCH_CHATS,allChatMembers)

      return res.status(200).json({
        success:true,
        message:"Member removed successfully"
      })
    }
    catch(error)
    {
      console.log(error)
      return next(new ErrorHandler(error.message,500))
    }

}







const leaveGroup=async(req,res,next)=>{
  try{

    const chatId=req.params.id

    const chat=await Chat.findById(chatId)

    if(!chat)
      {
        return next(new ErrorHandler("Chat not found",404))
      }
      if(!chat.groupChat)
        return next(new ErrorHandler("Not a group chat",400))

      if(chat.creator.toString()==req.user.toString())
      {
               const remainingMembers=chat.members.filter((member)=>member.toString()!=req.user.toString())
               const newCreator=remainingMembers[0];
               chat.creator=newCreator;
      }
     

      const memberExists = chat.members.some(member => member.toString() === req.user.toString());

      if (!memberExists) {
        return next(new ErrorHandler("You are not a member of this group", 400));
      }
      

      chat.members=chat.members.filter((member)=>member.toString()!=req.user.toString());
    
    const user=await User.findById(req.user,"name")
    const messageForDB={
      content:`${user.name} has left the group`,
      sender:reChatId,
      chat:chatId
  }
  await Message.create(messageForDB);
      await chat.save();
      emitEvent(
        req,
        ALERT,
        chat.members,
        `${user.name} left the group`
      )

      return res.status(200).json({
        success:true,
        message:"You have left the group successfully"
      })
      

    
  }catch(error)
  {
    return next(new ErrorHandler("Error in exiting group",500))
  }


}
// const sendAttachments=async(req,res,next)=>{
   
// try{
//   const {chatId}=req.body;
//   const chat=await Chat.findById(chatId);
//   const me=await User.findById(req.user, "name")
//   if(!chat)
//     return next(new ErrorHandler("Chat not found",404))
//   if(!me)
//   {
//     return next(new ErrorHandler("Please login",403))
//   }
//   const files=req.files ||[]

//   if(files.length<1)
//     return next(new ErrorHandler("Please attach files",400))

// const attachments=[];

// const messageForDB = {
//   content: "",
//   attachments,
//   sender: me._id,
//   chat: chatId,
// };

// const messageForRealTime = {
//   ...messageForDB,
//   sender: {
//     _id: me._id,
//     name: me.name,
//   },
// };

//  emitEvent(req,NEW_ATTACHMENT,chat.members,{
//   message:messageForRealTime,
//   chatId,
//  })
   

//  emitEvent(req,NEW_MESSAGE_ALERT,chat.members,{chatId})



 

//   const message= await Message.create(messageForDB)

//   return res.status(200).json({
//     success:true,
//     message,
//   })
// }catch(error)
// {
//   return next(new ErrorHandler(error.message,500))
// }


// }

const sendAttachments = async (req, res, next) => {
  try{
  const { chatId } = req.body;

  const files = req.files || [];

  if (files.length < 1)
    return next(new ErrorHandler("Please Upload Attachments", 400));

  if (files.length > 5)
    return next(new ErrorHandler("Files Can't be more than 5", 400));

  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (files.length < 1)
    return next(new ErrorHandler("Please provide attachments", 400));

  //   Upload files here
  const attachments = await uploadFilesToCloudinary(files);

  const messageForDB = {
    content: "",
    attachments,
    sender: me._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: me._id,
      name: me.name,
    },
  };

  const message = await Message.create(messageForDB);
 
  emitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  // emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message,
  });
}catch(error){
  console.log(error)
  return next(new ErrorHandler(error.message,500))
}
};







const  getChatDetails =async(req,res,next)=>{

  try{

    if (req.query.populate === "true") {
      const chat = await Chat.findById(req.params.id)
        .populate("members", "name avatar")
        .lean();
  
      if (!chat) return next(new ErrorHandler("Chat not found", 404));
  
      chat.members = chat.members.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url,
      }));
  
      return res.status(200).json({
        success: true,
        chat,
      });
    } else {
      const chat = await Chat.findById(req.params.id);
      if (!chat) return next(new ErrorHandler("Chat not found", 404));
  
      return res.status(200).json({
        success: true,
        chat,
      });
    }
    
  }
  catch(error)
  {
    return next(new ErrorHandler(error.message,500));

  }

}


const renameGroup = async (req, res, next) => {
 try{

  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to rename the group", 403)
    );

  chat.name = name;

  await chat.save();

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Group renamed successfully",
  });
}
catch(error)
{
  return next(new ErrorHandler(error.message,500))
}
};






const deleteChat =async (req, res, next) => {

  try{
    const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const members = chat.members;

  if (chat.groupChat && chat.creator.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not allowed to delete the group", 403)
    );

  if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
    return next(
      new ErrorHandler("You are not allowed to delete the chat", 403)
    );
  }
 

  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) =>
    attachments.forEach(({ public_id }) => public_ids.push(public_id))
  );

  await Promise.all([
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully",
  });


}catch(error)
{
     return next(new ErrorHandler(error.message,500))
}
}


const getMessages = async (req, res, next) => {
   
  try{
  const chatId = req.params.id;
  const { page = 1 } = req.query;
   
  const resultPerPage = 20;
  const skip = (page - 1) * resultPerPage;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.members.includes(req.user.toString()))
    return next(
      new ErrorHandler("You are not allowed to access this chat", 403)
    );

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(resultPerPage)
      .populate("sender", "name avatar")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
  }
  catch(error)
  {
    return next(new ErrorHandler(error.message,500))
  }
};








export { getChatHeader,newGroupChat, getMyChats,getMyGroups,addMembers,removeMember,leaveGroup,sendAttachments,getChatDetails,renameGroup,deleteChat,getMessages};
