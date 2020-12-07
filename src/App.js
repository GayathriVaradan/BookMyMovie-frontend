import "./App.css";
import React, { useReducer } from "react";
import { Router } from "@reach/router";
import LandingPage from "./pages/Landing";
import AppContext from "./store/context";
import store from "./store";
import SelectedMovie from "./pages/SelectedMovie";
import WhichTheater from "./pages/WhichTheater";
import NoOfTickets from "./pages/NoOfTickets";
import SeatLayout from "./pages/SeatLayout";
import Payment from "./pages/Payment";
import Home from "./components/Home";
import ThankYou from "./pages/ThankYou";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Email from "./pages/Email";
import PaymentFail from "./pages/PaymentFail";

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  return (
    <>
      <Header />
      <div className="App">
        <AppContext.Provider value={{ state, dispatch }}>
          <Router>
            <Home path="/" />
            <LandingPage path="/landingPage" />
            <SelectedMovie path="/selectedMovie" />
            <WhichTheater path="/whichTheater" />
            <NoOfTickets path="/noOfTickets" />
            <SeatLayout path="/seatLayout" />
            <Payment path="/payment" />
            <PaymentFail path="/paymentFail" />
            <Email path="/email" />
            <ThankYou path="/thankYou" />
          </Router>
        </AppContext.Provider>
        <Footer />
      </div>
    </>
  );
}

export default App;
