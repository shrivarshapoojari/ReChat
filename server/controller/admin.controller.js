import jwt from "jsonwebtoken";
 import dotenv from "dotenv"
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/utility.js";
 

const cookieOptions = {
  maxAge:24*60*60*1000,
  sameSite:"none",
  httpOnly:true,
  secure:true
}
dotenv.config();
 const adminSecretKey=process.env.ADMIN_KEY
const adminLogin = async (req, res, next) => {
  try{

  
  const { secretKey } = req.body;
  if(!secretKey)
    return next(new ErrorHandler("admin key required",403))

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) return next(new ErrorHandler("Invalid Admin Key", 401));

  const token = jwt.sign(secretKey, process.env.JWT_SECRET);

  return res
    .status(200)
    .cookie("rechat-admin-token", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    })
    .json({
      success: true,
      message: "Authenticated Successfully, Welcome BOSS",
    });
  }
  catch(error)
  {
      return next(new ErrorHandler(error.message,500))
  }
};

const adminLogout = async (req, res, next) => {
  
  return res
    .status(200)
    .cookie("rechat-admin-token", "", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
};

const getAdminData = async (req, res, next) => {
  try{

  
  return res.status(200).json({
    admin: true,
  });
}
catch(error)
{
  return next(new ErrorHandler(error.message,500))
}
};

const allUsers = async (req, res) => {

  try{

  
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    status: "success",
    users: transformedUsers,
  });
}catch(error)
{
  return next(new ErrorHandler(error.message,500))
}
};

 
 
const getDashboardStats = async (req, res) => {
  try{

  

  const [groupsCount, usersCount, messagesCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

  const today = new Date();

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const last7DaysMessages = await Message.find({
    createdAt: {
      $gte: last7Days,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  const dayInMiliseconds = 1000 * 60 * 60 * 24;

  last7DaysMessages.forEach((message) => {
    const indexApprox =
      (today.getTime() - message.createdAt.getTime()) / dayInMiliseconds;
    const index = Math.floor(indexApprox);

    messages[6 - index]++;
  });

  const stats = {
    groupsCount,
    usersCount,
    messagesCount,
    totalChatsCount,
    messagesChart: messages,
  };

  return res.status(200).json({
    success: true,
    stats,
  });}
  catch(error)
  {
    return next(new ErrorHandler(error.message,500))
  }
};

export {
  allUsers,
 getAdminData,
  getDashboardStats,
  adminLogin,
  adminLogout,
  
};