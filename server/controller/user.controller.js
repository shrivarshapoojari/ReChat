import e from "cors";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/features.js";
import { compare } from "bcrypt";


const cookieOptions = {
  maxAge:0,
  sameSite:"none",
  httpOnly:true,
  secure:true
}
const newUser = async (req, res) => {
  try {
    const { name, username, password, bio } = req.body;

    // Check if all required fields are provided
    if (!name || !username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const avatar = {
      public_id: "a",
      url: "a",
    };

    // Create a new user
    const user = await User.create({
      name,
      bio,
      username,
      password,
      avatar,
    });

    sendToken(res, user, 201, "User Created");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const login = async (req, res) => {
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

const getMyProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user).select("-password");
       console.log(user)
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

  const searchUser=async(req,res)=>{

    
  }

export { login, newUser,getMyProfile,logout,searchUser };
