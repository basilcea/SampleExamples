import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import Home from "./Home";
import Auth from "./Auth";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/auth" component={Auth} />
    </div>
  );
};

export default App;
