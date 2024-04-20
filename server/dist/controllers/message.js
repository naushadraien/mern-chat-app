import { TryCatch } from "../middlewares/errorMiddleware.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Messages.js";
import { errorMessage, successData } from "../utils/utitlity-func.js";
export const sendMessage = TryCatch(async (req, res, next) => {
    const senderId = req.user?.id;
    const { id: receiverId } = req.params;
    const { message } = req.body;
    if (!senderId || !receiverId || !message) {
        return errorMessage(next, "All fields are required", 400);
    }
    if (senderId === receiverId) {
        return errorMessage(next, "You cannot send message to you", 400);
    }
    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId],
        },
    });
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });
    if (newMessage) {
        conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    return successData(res, "Message created successfully", newMessage, true);
});
export const getMessagesBetweenUser = TryCatch(async (req, res, next) => {
    const senderId = req.user?._id;
    const { id: receiverId } = req.params;
    const conversations = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId],
        },
    }).populate("messages");
    if (!conversations) {
        return errorMessage(next, "No messages found", 404);
    }
    return successData(res, "", conversations);
});
