import React from "react";
import "./whats.css";
import Post from "../../utils/post";

export default function Whats() {
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState(undefined);
  const [filename, setFilename] = React.useState(undefined);
  const [image, setImage] = React.useState("");
  const handleSubmit = async (e) => {
    console.log(message);
    const res = await Post.uploadPost(file, message);
    if (res.error) {
      alert(res.error);
      return;
    }
    setMessage("");
    setFile(undefined);
    setFilename(undefined);
    setImage("");
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

  return (
    <div className="whats-body">
      <div className="whats-text">What's on your mind?</div>
      {/* <form action={handleSubmit}> */}
      <div className="whats-content">
        <div className="whats-left">
          <input
            type="text"
            name="caption"
            className="whats-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            id="file"
            type="file"
            name="file"
            className="whats-file"
            value={filename}
            onChange={onImageChange}
          />
          <label htmlFor="file">
            <img
              src="/attach.svg"
              className="attachemt-icon"
              accept="image/*"
            />
          </label>
        </div>
        <button onClick={handleSubmit} className="post-button">
          Post
        </button>
      </div>
      {/* </form> */}
      {file && <img src={image} className="whats-image" />}
    </div>
  );
}
