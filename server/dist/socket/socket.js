import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});
const userSocketMap = {}; // {userId: socketId}
io.on("connection", (socket) => {
    console.log("user connected with sockedId as", socket.id);
    const userId = socket.handshake.query.userId;
    if (typeof userId === "string")
        userSocketMap[userId] = socket.id;
    console.log(Object.keys(userSocketMap));
    socket.emit("getOnlineUser", Object.keys(userSocketMap));
    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        if (typeof userId === "string")
            delete userSocketMap[userId];
        socket.emit("getOnlineUser", Object.keys(userSocketMap));
    });
});
export { app, server, io };
