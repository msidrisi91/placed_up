import React from "react";
import "./post.css";
import { Link } from "react-router-dom";

function getUser(userId) {
  return {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/thumb/men/65.jpg",
  };
}

export default function Post(props) {
  const { data } = props;
  const user = getUser(data.userId);
  console.log(user);
  return (
    <div className="post-body">
      {/* TODO: Add unfollow/follow button on post header */}
      <div className="post-header">
        <img src={user.avatar} className="post-header-image" />
        <div className="post-header-name">{user.name}</div>
      </div>

      <div className="post-caption">{data.caption}</div>
      <img src={data.image} className="post-image" />
      <div className="post-footer">
        <div className="post-footer-left">
          <img src="/like.svg" className="post-footer-like-icon space-right" />
          <div className="post-footer-count space-right">
            {data.likes.length}
          </div>
          <img
            src="/comment.svg"
            className="post-footer-comment-icon space-right"
          />
          <div className="post-footer-count space-right">
            {data.comments.length}
          </div>
        </div>
        <div className="post-footer-right">
          <img src="/share.svg" className="share-icon" />
        </div>
      </div>
    </div>
  );
}
