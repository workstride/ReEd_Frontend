import React from "react";
import { HashRouter, BrowserRouter as Route } from "react-router";

import Main from "./componets/main/Main.js";
import SignIn from "./componets/sigin/SigIn.js";

class Routes extends React.Component {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/main" component={Main} />
        </Routes>
      </HashRouter>
    );
  }
}

export default Routes;
