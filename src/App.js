import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignIn from "./sigin/SignIn";
import Main from "./main/Main";
import AnnouncementForm from "./announcement/Announcement";
import Qr from "./qr/Qr";
import AnimatedCursor from "react-animated-cursor";

function App() {
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
        <Route path="/signin" component={SignIn} />
        <Route path="/main" component={Main} />
        <Route path="/announcement" component={AnnouncementForm} />
        <Route path="/qr" component={Qr} />
      </div>
    </Router>
  );
}

export default App;
