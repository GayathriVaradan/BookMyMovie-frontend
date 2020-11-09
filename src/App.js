import "./App.css";
import React, { useReducer } from "react";
import { Router } from "@reach/router";
import LandingPage from "./pages/Landing/landing-index";
import AppContext from "./store/context";
import store from "./store";
import SelectedMovie from "./pages/SelectedMovie/selectedMovie-index";
import WhichTheater from "./pages/WhichTheater/whichTheater-index";
import BookTickets from "./pages/BookTickets/bookTickets-index";
import SeatLayout from "./pages/SeatLayout/SeatLayout";
import WhichShow from "./pages/WhichShow/whichShow";

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  return (
    <div>
      <div className="App">Hello!</div>
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <LandingPage path="/landingPage" />
          <SelectedMovie path="/selectedMovie" />
          <WhichTheater path="/whichTheater" />
          <BookTickets path="/bookTickets" />
          <SeatLayout path="/seatLayout" />
          <WhichShow path="/whichShow" />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
