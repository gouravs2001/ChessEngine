const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const { log } = require("console");

const app = express();
const server = http.createServer(app);
const PORT = 5000;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const playerid = []

app.use(cors());
let playerCount = 0;

io.on("connection", (socket) => {
  playerCount++;
  console.log("number of players", playerCount);
  console.log(playerid)

  if (playerCount === 1) {
    playerid.push(socket.id)
    socket.emit("setBoardColor", "white");
    console.log("PLAYER 1");
  } else if (playerCount === 2) {
    playerid.push(socket.id)
    socket.broadcast.emit("socketid" , playerid)
    socket.emit("setBoardColor", "black");
    console.log("player2");
  } else if (playerCount > 2) {
    socket.emit("roomFull", "Sorry, the room is full.");
    socket.disconnect(true); // Disconnect the socket
    playerCount--;
    console.log(playerCount, "RoomFull");
  }

  socket.on("move", (move) => {
    console.log(move);
    socket.broadcast.emit("recieved_move", move);
  });

  // let indexToRemove = myArray.indexOf(elementToRemove);

  socket.on("disconnect", () => {
    console.log("user Disconnected ");
    console.log(socket.id)
    playerCount--;
  });
});

server.listen(PORT, () => console.log("Server running on port " + PORT));
