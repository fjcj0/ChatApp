import User from "../models/user.model.js";
import Message from "../models/message.model.js";
export const getUsersForSidebar = async (request, response) => {
    try {
        const loggedInUserId = request.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });
        return response.status(200).json(filteredUsers);
    } catch (error) {
        console.log(error.message);
        return response.status(400).json({ error: error.message });
    }
};
export const getMessages = async (request, response) => {
    try {
        const { id: userToChatId } = request.params;
        const myId = request.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
        return response.status(200).json(messages);
    } catch (error) {
        console.log(error.message);
        return response.status(400).json({ error: error.message });
    }
};