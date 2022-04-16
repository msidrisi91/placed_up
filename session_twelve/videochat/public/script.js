const socket = io("/");

const videoGrid = document.getElementById("video-grid");

const myUser = prompt("Enter your user name");

const myPeer = new Peer(undefined, {});

const peers = {};

const myVideo = document.createElement("video");
myVideo.muted = true;
let myStream = undefined;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);
    myStream = stream;
    myPeer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });
    socket.on("user-connected", (userid) => {
      connectToNewUser(userid, stream);
    });
  });
socket.on("user-disconnected", (userid) => {
  if (peers[userid]) peers[userid].close();
});

myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id, myUser);
});

function connectToNewUser(userid, stream) {
  const call = myPeer.call(userid, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });
  peers[userid] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

let text = document.getElementById("chat_message");
let send = document.getElementById("send");
let messages = document.getElementById("messages");

send.addEventListener("click", (e) => {
  if (text.value != "") {
    socket.emit("message", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (text.value != "") {
      socket.emit("message", text.value);
      text.value = "";
    }
  }
});

socket.on("createmessage", (message, userid, username) => {
  let newMessage = document.createElement("div");
  newMessage.className = "message";

  newMessage.innerHTML = `<span>${username}</span> ${message}`;
  messages.append(newMessage);
  // messages.scrollTop = messages.scrollHeight;
});

const invite = document.getElementById("invite");
const video = document.getElementById("video");
const mic = document.getElementById("mic");

mic.addEventListener("click", (e) => {
  if (mic.className === "fa fa-microphone") {
    mic.className = "fa fa-microphone-slash";
    myStream.getAudioTracks()[0].enabled = false;
  } else {
    mic.className = "fa fa-microphone";
    myStream.getAudioTracks()[0].enabled = true;
  }
});

video.addEventListener("click", (e) => {
  if (video.className === "fa fa-video-camera") {
    video.className = "fas fa-video-slash";
    myStream.getVideoTracks()[0].enabled = false;
  } else {
    video.className = "fa fa-video-camera";
    myStream.getVideoTracks()[0].enabled = true;
  }
});

invite.addEventListener("click", (e) => {
  prompt(
    "Copy and share this URL to invite someone to your video chat",
    window.location.href
  );
});
