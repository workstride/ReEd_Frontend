import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from "axios";
import SignIn from "./sigin/SignIn";
import Main from "./main/Main";
import AnnouncementForm from "./announcement/Announcement";
import Qr from "./qr/Qr";
import AnimatedCursor from "react-animated-cursor";

function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get("/api/auth/refresh");
        const { accessToken } = response.data;
        setAccessToken(accessToken);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const currentTime = new Date().getTime();

      if (tokenExpiration && currentTime >= tokenExpiration) {
        refreshAccessToken();
      }
    };

    const refreshAccessToken = async () => {
      try {
        const response = await axios.post("/api/auth/refresh");
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1시간 (밀리초 단위)
        localStorage.setItem("tokenExpiration", expirationTime);
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    };

    checkTokenExpiration();
  }, [accessToken]);

  return (
    <Router>
      <div className="App">
        <AnimatedCursor
          innerSize={25}
          outerSize={8}
          innerScale={0.7}
          color="51, 153, 102"
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />
        <Route exact path="/" render={() => <Redirect to="/signin" />} />
        <Route
          path="/signin"
          render={() => <SignIn setAccessToken={setAccessToken} />}
        />
        <Route path="/main" component={Main} />
        <Route path="/announcement" component={AnnouncementForm} />
        <Route path="/qr" component={Qr} />
      </div>
    </Router>
  );
}

export default App;
