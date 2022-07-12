import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
import UserService from "../../utils/user";
import PostService from "../../utils/post";

export default function Post(props) {
  const { currentUser } = props;
  const [postContent, setPostContent] = React.useState(props.data);
  const [user, setUser] = React.useState({});
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    async function get() {
      var data = await UserService.getUserById(props.data.userId);
      setUser(data);
    }
    if (props.data.likes.includes(currentUser._id)) setIsLiked(true);
    get();
  }, []);

  const handlelike = async () => {
    if (currentUser) {
      await PostService.likePost(postContent._id, currentUser._id);
      if (postContent.likes.includes(currentUser._id)) {
        var index = postContent.likes.indexOf(currentUser._id);
        postContent.likes.splice(index, 1);
        setIsLiked(false);
      } else {
        postContent.likes.push(currentUser._id);
        setIsLiked(true);
      }
      setPostContent(postContent);
    }
  };

  console.log(user);
  return (
    <div className="post-body">
      {/* TODO: Add unfollow/follow button on post header */}
      <div className="post-header">
        <img src={user.profilePicture} className="post-header-image" />
        <p className="post-header-name">{user.fullname}</p>
      </div>

      <div className="post-caption">{postContent.caption}</div>
      <img src={postContent.image} className="post-image" />
      <div className="post-footer">
        <div className="post-footer-left">
          <img
            src={isLiked ? "/likefilled.svg" : "/like.svg"}
            className="post-footer-like-icon space-right"
            onClick={handlelike}
          />
          <div className="post-footer-count space-right">
            {postContent.likes.length}
          </div>
          <img
            src="/comment.svg"
            className="post-footer-comment-icon space-right"
            onClick={() => {
              window.location.href = `/post/${postContent._id}`;
            }}
          />
          <div className="post-footer-count space-right">
            {postContent.comments.length}
          </div>
        </div>
        <div className="post-footer-right">
          <img
            src="/share.svg"
            className="share-icon"
            onClick={() => {
              alert("Link Copied!");
              navigator.clipboard.writeText(
                `${window.location.origin}/post/${postContent._id}`
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
