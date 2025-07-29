const http = require("http");
const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRommId = (userId , targetUserId)=>{
  return crypto.createHash("sha256").update({userId , targetUserId}.sort().join("_")).digest("hex")
}
const initializeSocket = (app) => {
  const server = http.createServer(app);

  const io = socket(server, {
    cors: {
      origin: "https://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinChat", ({firstName ,userId , targetUserId}) => {
      // Handle joinChat event
      const roomId = [userId , targetUserId].join("_");
      console.log( firstName ,"JOIN ROMM" , roomId)
      socket.join(roomId);
      
    });

    socket.on("sendMessage", ({firstName , userId , targetUserId , text}) => {
      const roomId = getSecretRommId(userId , targetUserId);
      console.log(firstName , text);
      io.to(roomId).emit("message recueved" , {firstName , text});
      // Handle sendMessage event
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return server;
};

module.exports = initializeSocket;
