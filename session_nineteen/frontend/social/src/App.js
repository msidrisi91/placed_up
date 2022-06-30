import "./App.css";
import Registration from "./pages/Register/register";
import Login from "./pages/Login/login";
import Feeds from "./pages/Feeds/feeds";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/register" element={<Registration />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/feeds" element={<Feeds />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
