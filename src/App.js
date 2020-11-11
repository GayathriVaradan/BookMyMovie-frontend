import "./App.css";
import React, { useReducer } from "react";
import { Router } from "@reach/router";
import LandingPage from "./pages/Landing/landing-index";
import AppContext from "./store/context";
import store from "./store";
import SelectedMovie from "./pages/SelectedMovie/selectedMovie-index";
import WhichTheater from "./pages/WhichTheater/whichTheater-index";
import NoOfTickets from "./pages/NoOfTickets/noOfTickets-index";
import SeatLayout from "./pages/SeatLayout/SeatLayout";
import EmailReservation from "./pages/EmailReservation/emailReservation-index";

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
          <NoOfTickets path="/noOfTickets" />
          <SeatLayout path="/seatLayout" />
          <EmailReservation path="/emailReservation" />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
