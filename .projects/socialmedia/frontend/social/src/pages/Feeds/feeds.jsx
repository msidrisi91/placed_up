import React from "react";
import "./feeds.css";
import Navbar from "../../components/navbar";
import Post from "../../components/Post/post";
import Whats from "../../components/Whats/whats";
import People from "../../components/People/people";
import UserService from "../../utils/user";
import PostService from "../../utils/post";

export default function Feeds() {
  var user = UserService.getCurrentUser();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function get() {
      var data = await PostService.getPosts(user._id);
      setPosts(data);
    }
    get();
  }, []);

  return (
    <>
      <Navbar page="feeds" user={user} />
      <div className="feeds-body">
        <div className="feeds-left">
          <Whats />
          {posts.map((post) => (
            <Post data={post} key={post._id} currentUser={user} />
          ))}
        </div>
        <div className="feeds-right">
          <People key="following" type="following" user={user} />
          <People key="followers" type="followers" user={user} />
          <People key="suggested" type="suggested" user={user} />
        </div>
      </div>
    </>
  );
}
