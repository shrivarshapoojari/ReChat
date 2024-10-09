import { emitEvent } from '../utils/features.js';
import { Chat } from '../models/chat.model.js';
import { ALERT, REFETCH_CHATS } from '../constants/events.js';

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

const getMyChats = async (req, res, next) => {
    try {
        // Find chats where the user is a member
        const myChats = await Chat.find({ members: req.user }).populate("members", "name avatar");

        // Transform chat data before sending the response
        const transformedChats = myChats.map(chat => ({
            _id: chat._id,
            name: chat.name,
            groupChat: chat.groupChat,
            members: chat.members,
            lastmessage: chat.lastmessage,
        }));

        return res.status(200).json({ success: true, chats: transformedChats });

    } catch (error) {
        console.error("Error fetching chats:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { newGroupChat, getMyChats };
