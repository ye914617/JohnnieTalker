const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const io = new Server(server, {
  cors: {
    origin: "https://ye914617-makes-great-sites.netlify.app",
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (someone) => {
    console.log(`${someone} joined the room`);
    io.emit("announce-join", someone);
  });

  socket.on("send-message", (msg) => {
    // console.log(msg);
    io.emit("receive-message", msg);
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
  });
});

app.use(express.static("/client/build"));
app.use(cors());

app.use("/", (req, res) => {
  res.sendFile("index.js", { root: __dirname });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
