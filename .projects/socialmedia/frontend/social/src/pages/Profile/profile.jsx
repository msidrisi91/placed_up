import React from "react";
import "./profile.css";
import UserService from "../../utils/user";
import PostService from "../../utils/post";
import Navbar from "../../components/navbar";
import Post from "../../components/Post/post";
import { useParams } from "react-router-dom";

export default function Profile(props) {
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const { userId } = useParams();
  const [user, setUser] = React.useState(undefined);
  const [posts, setPosts] = React.useState([]);

  const handlebutton = async () => {
    if (userId === currentUser._id) {
      window.location.href = window.location.href + "/edit";
    }
  };
  React.useEffect(() => {
    async function get() {
      let cu = UserService.getCurrentUser();
      console.log(cu, userId);
      let temp;
      if (cu && userId === cu._id) {
        temp = cu;
      } else if (userId) {
        console.log("userId", userId);
        temp = await UserService.getUserById(userId);
      }
      setCurrentUser(cu);
      setUser(temp);
      setTimeout(async () => {
        console.log("user", user);
        var data = await PostService.getPostByUserId(cu._id);
        setPosts(data);
      }, 2000);
    }
    get();
  }, []);

  return (
    <>
      {currentUser && <Navbar page="feeds" user={currentUser} />}
      {user && (
        <div className="profile-container">
          <div className="profile-header">
            <img
              src={user.profilePicture}
              alt="profile"
              className="profile-header-image"
            />

            <div className="profile-header-info">
              <div className="profile-header-info-name">{user.fullname}</div>
              <div className="profile-header-info-username">
                @{user.username}
              </div>
              <div className="profile-header-info-bio">{user.bio}</div>
              <button className="profile-page-button" onClick={handlebutton}>
                {userId === currentUser._id
                  ? "Edit Profile"
                  : currentUser.following.includes(user._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
          </div>
          <div className="profile-posts">
            {posts.map((post) => (
              <Post data={post} currentUser={currentUser} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
