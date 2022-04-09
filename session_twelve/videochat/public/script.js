const socket = io("/");

const videoGrid = document.getElementById("video-grid");

const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

const peers = {};

const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: false,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

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
  socket.emit("join-room", ROOM_ID, id);
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
