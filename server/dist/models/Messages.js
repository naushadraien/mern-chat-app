import mongoose from "mongoose";
const messagesSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide senderId"],
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide senderId"],
    },
    message: {
        type: String,
        required: [true, "Please provide message"],
    },
}, { timestamps: true });
const Message = mongoose.model("Message", messagesSchema);
export default Message;
