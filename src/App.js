import "./App.css";
import React from "react";
import { Router } from "@reach/router";
import LandingPage from "./pages/Landing/landing-index";

function App() {
  return (
    <div>
      <div className="App">Hello!</div>
      <Router>
        <LandingPage path="/landingPage" />
      </Router>
    </div>
  );
}

export default App;
