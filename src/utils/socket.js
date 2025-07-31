const http = require("http");
const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],

      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      // Handle joinChat event
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName, "JOIN ROMM", roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        //Save mssgs to dataabase

        try {

          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName, " sent ", text);

          //check if userId and tagetUserID are friends
          
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("message received", { firstName, text });
        } catch (err) {
          console.err(err);
        }
        // Handle sendMessage event
      }
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return server;
};

module.exports = initializeSocket;
