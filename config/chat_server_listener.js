// Define the list of allowed origins
// const allowedOrigins = [
//   "https://konncect-env.eba-bgy9kheh.ap-south-1.elasticbeanstalk.com",
//   "http://konncect-env.eba-bgy9kheh.ap-south-1.elasticbeanstalk.com",
//   "http://localhost:8000",
// ];
module.exports.chatServerListener = (io) => {
  // let Server = require("socket.io");
  // let io = Server(socketServer, {
  //   cors: {
  //     origin: allowedOrigins,
  //     methods: ["GET", "POST"],
  //   },
  // });
    io.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

  io.on("connection", (socket) => {
    console.log(`socket connected!! ${socket.id}`);



    socket.on("disconnect", () => {
      console.log("socket disconnected!");
    });

    socket.on("join_room", (data) => {
      try {
        console.log("joining request rec.", data);
        socket.join(data.chatroom);
        io.in(data.chatroom).emit("user_joined", data);
      } catch (error) {
        console.log("Error joining room:", error);
        // Handle the error here, e.g. send an error message to the client
      }
    });

    socket.on("send_message", (data) => {
      try {
        io.in(data.chatroom).emit("receive_message", data);
      } catch (error) {
        console.log("Error sending message:", error);
        // Handle the error here, e.g. send an error message to the client
      }
    });
  });
};
