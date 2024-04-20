import mongoose from "mongoose";
import { MessageType } from "../types/types.js";

const messagesSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Message = mongoose.model<MessageType>("Message", messagesSchema);

export default Message;
