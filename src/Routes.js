import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Main from "./components/main/Main.js";
import SignIn from "./components/signin/SignIn.js";

class Routes extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/main" component={Main} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Routes;
