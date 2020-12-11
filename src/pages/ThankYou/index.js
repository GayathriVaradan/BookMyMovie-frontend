import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

function ThankYou() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const {
    selectedMovie,
    selectedDate,
    selectedTheater,
    selectedShow,
    selectedSeats,
    firstName,
    lastName,
    email,
    pricePaid,
  } = state;

  return (
    <div className="thankYou">
      {t("Thank you for booking the movie with us! Hope you enjoy the movie!!")}
      <br />
      <div className="ticketLayout">
        <div>
          {t("Movie")} : {selectedMovie.title}
        </div>
        <div>
          {t("Date")} : {selectedDate}
        </div>
        <div>
          {t("Theater")} : {selectedTheater.theaterName}
        </div>
        <div>
          {t("Show")} : {selectedShow.show}
        </div>
        <div>
          {t("Selected Seats")} : {selectedSeats}
        </div>
        <div name="first">
          {t("First Name")} : {firstName}
        </div>
        <div name="last">
          {t("Last Name")} : {lastName}
        </div>
        <div name="user_email">
          {t("Email")} : {email}
        </div>
        <div name="pricePaid">
          {t("Price Paid")} : {pricePaid}
        </div>
      </div>
      {t("To browse the latest movies checkout the website!!")}
      <button
        type="button"
        className="commonButton"
        onClick={() => {
          navigate("./");
        }}
      >
        Book My Movie
      </button>
    </div>
  );
}
export default ThankYou;
