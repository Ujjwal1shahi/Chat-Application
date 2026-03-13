import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    const userSocketMap = new Map();
    const getUserId = (value) =>
        typeof value === "string" ? value : value?._id || value?.id;

    const disconnect = (socket) => {
        console.log(`Client Disconnected : ${socket.id}`);

        for(const [userId, socketId] of userSocketMap.entries()){
            if(socketId === socket.id){
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const emitMessage = (socketId, messageData) => {
        io.to(socketId).emit("receiveMessage", messageData);
    };

    const sendMessage = async(message) => {
        try {
            const senderId = getUserId(message?.sender);
            const recipientId = getUserId(message?.recipient);
            const content = typeof message?.content === "string" ? message.content.trim() : "";

            if (!senderId || !recipientId || !content) {
                return;
            }

            const senderSocketId = userSocketMap.get(senderId);
            const recipientSocketId = userSocketMap.get(recipientId);

            const createdMessage = await Message.create({
                ...message,
                sender: senderId,
                recipient: recipientId,
                content,
            });

            const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .populate("recipient", "id email firstName lastName image color");

            if(recipientSocketId){
                emitMessage(recipientSocketId, messageData);
            }
            if(senderSocketId){
                emitMessage(senderSocketId, messageData);
            }
        } catch (error) {
            console.log("sendMessage error:", error.message);
        }
    };

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if(userId){
            userSocketMap.set(userId, socket.id);
            console.log(`User connected : ${userId} with socket ID : ${socket.id}`);
        }
        else{
            console.log("User ID not provided during connection.");
        }

        socket.on("sendMessage", sendMessage);
        socket.on("disconnect", () => disconnect(socket));
    });
};

export default setupSocket;
