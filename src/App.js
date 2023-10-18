import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignIn from "./sigin/SignIn";
import Main from "./main/Main";
import AnnouncementForm from "./announcement/Announcement";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={() => <Redirect to="/signin" />} />
        <Route path="/signin" component={SignIn} />
        <Route path="/main" component={Main} />
        <Route path="/announcement" component={AnnouncementForm} />
      </div>
    </Router>
  );
}

export default App;
