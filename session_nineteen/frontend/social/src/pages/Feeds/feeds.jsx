import React from "react";
import "./feeds.css";
import Navbar from "../../components/navbar";
import Post from "../../components/Post/post";
export default function Feeds() {
  var user = {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    profile_url: "#",
  };

  var posts = [
    {
      userId: "shaheem91",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      caption: "Hello, Wassup?",
      likes: ["karan", "abhay", "jai"],
      comments: ["karan", "abhay", "jai", "krishna"],
    },
    {
      userId: "em91",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      caption: "Hello, Wassup?",
      likes: ["karan", "abhay", "jai"],
      comments: ["karan", "abhay"],
    },
  ];
  return (
    <>
      <Navbar page="feeds" user={user} />
      <div className="feeds-body">
        <div className="feeds-left">
          {posts.map((post) => (
            <Post data={post} />
          ))}
        </div>
      </div>
    </>
  );
}
