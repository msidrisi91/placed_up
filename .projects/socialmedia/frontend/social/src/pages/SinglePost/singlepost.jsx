import React from "react";
import "./singlepost.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Post from "../../components/Post/post";
import UserService from "../../utils/user";
import PostService from "../../utils/post";

export default function SinglePost(props) {
  const { postId } = useParams();
  const [post, setPost] = React.useState(undefined);
  const currentUser = UserService.getCurrentUser();

  React.useEffect(() => {
    async function get() {
      let data = await PostService.getPostById(postId);
      setPost(data);
    }
    get();
  }, []);

  return (
    <>
      {currentUser && <Navbar page="feeds" user={currentUser} />}
      {post && <Post data={post} currentUser={currentUser} />}
      {post && post.comments.map((c) => <Comment data={c} />)}
      {post && (
        <AddComment
          data={post}
          username={currentUser.username}
          setPost={setPost}
        />
      )}
    </>
  );
}

const Comment = ({ data }) => {
  return (
    <div className="comment">
      <div className="comment-username">{data.username}</div>
      <div className="comment-text">{data.text}</div>
    </div>
  );
};

const AddComment = ({ data, username, setPost }) => {
  const [text, setText] = React.useState("");
  const handleSubmit = async (e) => {
    let post = await PostService.commentPost(data._id, text, username);
    console.log(post);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div className="comment">
      <input
        type="text"
        name="text"
        id="text"
        className="comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit} className="comment-button">
        Add Comment
      </button>
    </div>
  );
};
