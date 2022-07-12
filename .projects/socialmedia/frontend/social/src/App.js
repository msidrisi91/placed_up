import "./App.css";
import Registration from "./pages/Register/register";
import Login from "./pages/Login/login";
import Feeds from "./pages/Feeds/feeds";
import Profile from "./pages/Profile/profile";
import SinglePost from "./pages/SinglePost/singlepost";
import EditProfile from "./pages/EditProfile/editprofile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserService from "./utils/user";

function App() {
  const user = UserService.getCurrentUser();
  const Redirect = ({ to }) => {
    window.location.href = to;
    return <></>;
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Redirect to="/feeds" />} />
          <Route
            exact
            path="/register"
            element={user ? <Redirect to="/feeds" /> : <Registration />}
          />
          <Route
            exact
            path="/login"
            element={user ? <Redirect to="/feeds" /> : <Login />}
          />
          <Route
            exact
            path="/feeds"
            element={user ? <Feeds /> : <Redirect to="/login" />}
          />
          <Route
            path="/profile/:userId"
            element={user ? <Profile /> : <Redirect to="/login" />}
          />
          <Route
            path="/profile/:userId/edit"
            element={
              user ? (
                <EditProfile currentUser={user} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/post/:postId"
            element={user ? <SinglePost /> : <Redirect to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
