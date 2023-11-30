const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const PORT = 5000;
const io = socketio(server);

app.use(cors());
server.listen(PORT, () => console.log("Server running on port " + PORT));
