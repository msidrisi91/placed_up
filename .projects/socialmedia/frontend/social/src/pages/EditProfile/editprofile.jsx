import React from "react";
import "./editprofile.css";
import PostService from "../../utils/post";
import UserService from "../../utils/user";
import Navbar from "../../components/navbar";
import Post from "../../components/Post/post";
import { useParams } from "react-router-dom";

export default function Profile(props) {
  const { currentUser } = props;
  const { userId } = useParams();
  const [user, setUser] = React.useState(undefined);
  const [posts, setPosts] = React.useState([]);
  const [file, setFile] = React.useState(undefined);
  const [filename, setFilename] = React.useState(undefined);
  const [image, setImage] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [bio, setBio] = React.useState("");

  const handleSubmit = async (e) => {
    const res = await UserService.updateUser(userId, file, fullname, bio);
    if (res.error) {
      alert(res.error);
      return;
    }
    let url = window.location.href.split("/");
    window.location.href = "/profile/" + url[4];
  };

  const fileToDataUri = (f) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(f);
    });

  const onImageChange = (event) => {
    const file = event.target.files[0];
    setFilename(event.target.value);
    setFile(file);
    if (!file) {
      setImage("");
      return;
    }
    fileToDataUri(file).then((dataUri) => {
      setImage(dataUri);
    });
  };

  React.useEffect(() => {
    setUser(props.currentUser);
    setImage(props.currentUser.profilePicture);
    setFullname(props.currentUser.fullname);
    setBio(props.currentUser.bio);
    setTimeout(async () => {
      console.log("user", user);
      var data = await PostService.getPostByUserId(props.currentUser._id);
      setPosts(data);
    }, 2000);
  }, []);

  return (
    <>
      {currentUser && <Navbar page="feeds" user={currentUser} />}
      {user && (
        <div className="profile-container">
          <div className="profile-header">
            <img src={image} alt="profile" className="profile-header-image" />

            <div className="profile-header-info">
              <input
                className="profile-header-info-name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <div className="profile-header-info-username">
                @{user.username}
              </div>
              <input
                className="profile-header-info-bio"
                placeholder="Bio..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <div className="profile-button-container">
                <span>
                  <button
                    className="profile-page-button"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </span>
                <span>
                  <label htmlFor="file">
                    <div className="profile-page-button">
                      Change Profile Image
                    </div>
                  </label>
                </span>
              </div>

              <input
                id="file"
                type="file"
                name="file"
                className="file"
                value={filename}
                onChange={onImageChange}
              />
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
