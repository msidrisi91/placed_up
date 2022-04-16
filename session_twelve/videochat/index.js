const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { room_id: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomid, userid, username) => {
    socket.join(roomid);

    socket.to(roomid).emit("user-connected", userid);

    socket.on("message", (message) => {
      io.to(roomid).emit("createmessage", message, userid, username);
    });

    socket.on("disconnect", () => {
      socket.to(roomid).emit("user-disconnected", userid);
    });
  });
});

server.listen(3000);
