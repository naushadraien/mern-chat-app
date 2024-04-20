import express from "express";
import { getMessagesBetweenUser, sendMessage } from "../controllers/message.js";
import { authenticateUser } from "../utils/authenticateUser.js";

const app = express.Router();

app.get("/:id", authenticateUser, getMessagesBetweenUser);
app.post("/send/:id", authenticateUser, sendMessage);

export default app;
