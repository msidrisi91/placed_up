import upload from "./upload";
import { getCurrentUser } from "./user";

async function uploadPost(file, caption) {
  const user = await getCurrentUser();
  var image_url = "";
  if (file) {
    image_url = await upload(file);
  }
  const userId = user._id;
  const post = {
    userId: userId,
    caption: caption,
    image: image_url,
  };
  try {
    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      alert("Error: " + res.status + " " + res.statusText);
    }
  } catch (err) {
    console.log("post.js:", err);
    return { error: err };
  }
}

async function getPosts(userId) {
  try {
    console.log("userId:", userId);
    const res = await fetch("http://localhost:5000/posts/timeline/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      alert("Error: " + res.status + " " + res.statusText);
    }
  } catch (err) {
    console.log("post.js:", err);
    return { error: err };
  }
}

async function likePost(postId, userId) {
  try {
    const res = await fetch(
      "http://localhost:5000/posts/like/" + userId + "/" + postId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      alert("Error: " + res.status + " " + res.statusText);
    }
  } catch (err) {
    console.log("post.js:", err);
    return { error: err };
  }
}

async function getPostByUserId(userId) {
  try {
    const res = await fetch("http://localhost:5000/posts/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      alert("Error: " + res.status + " " + res.statusText);
    }
  } catch (err) {
    console.log("post.js:", err);
    return { error: err };
  }
}

async function getPostById(postId) {
  try {
    const res = await fetch("http://localhost:5000/posts/" + postId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      alert("Error: " + res.status + " " + res.statusText);
    }
  } catch (err) {
    console.log("post.js:", err);
    return { error: err };
  }
}

async function commentPost(postId, text, username) {
  try {
    const res = await fetch("http://localhost:5000/posts/comment/" + postId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, username: username }),
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      alert("Error: " + res.status + " " + res.statusText);
    }
  } catch (err) {
    console.log("post.js:", err);
    return { error: err };
  }
}

export default {
  uploadPost,
  getPosts,
  likePost,
  getPostByUserId,
  getPostById,
  commentPost,
};
