import React from "react";
import "./feeds.css";
import Navbar from "../../components/navbar";
import Post from "../../components/Post/post";
import Whats from "../../components/Whats/whats";
import People from "../../components/People/people";

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
          <Whats />
          {posts.map((post) => (
            <Post data={post} key={post.caption} />
          ))}
        </div>
        <div className="feeds-right">
          <People type="following" user={user} />
          <People type="followers" user={user} />
          <People type="suggested" user={user} />
        </div>
      </div>
    </>
  );
}
