/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import AppContext from "../../store/context";
import "./thankyou-index.css";

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
  function sendEmail(e) {
    e.preventDefault();
    console.log("e.target : ", e.target);
    emailjs
      .sendForm(
        "Gmail",
        "template_wv7v8lh",
        e.target,
        "user_HH6Ir5naHSoqnYDsO9PhW"
      )
      .then(
        (result) => {
          console.log(result.text, e.target);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  return (
    <div>
      {t("Thank you for booking the movie with us! Hope you enjoy the movie!!")}
      <br />
      <form className="contact-form" onSubmit={sendEmail}>
        <table className="emailtable">
          <tbody>
            <tr>
              <th>
                <label htmlFor="movieTitle">{t("Movie")} :</label>
              </th>
              <td>
                <textarea
                  id="movieTitle"
                  name="movieTitle"
                  value={selectedMovie.title}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="selectedDate">{t("Date")} :</label>
              </th>
              <td>
                <textarea
                  id="selectedDate"
                  name="selectedDate"
                  value={selectedDate}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="selectedTheater">{t("Theater")} :</label>
              </th>
              <td>
                <textarea
                  id="selectedTheater"
                  name="selectedTheater"
                  value={selectedTheater.theaterName}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="selectedShow">{t("Show")} : </label>
              </th>
              <td>
                <textarea
                  id="selectedShow"
                  name="selectedShow"
                  value={selectedShow.show}
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="selectedSeats">{t("Selected seats")} :</label>
              </th>
              <td>
                <textarea
                  id="selectedSeats"
                  name="selectedSeats"
                  value={selectedSeats}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>{t("First Name")}</th>
              <td>
                <textarea
                  name="first"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  readOnly
                />
                {/* <input name="first" type="text" placeholder="First Name" /> */}
              </td>
            </tr>
            <tr>
              <th>{t("Last Name")}</th>
              <td>
                <textarea
                  name="last"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  readOnly
                />
                {/* <input name="last" type="text" placeholder="Last Name" /> */}
              </td>
            </tr>
            <tr>
              <th>{t("Email")}</th>
              <td>
                <textarea
                  name="user_email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  readOnly
                />
                {/* <input name="user_email" type="text" placeholder="Email" /> */}
              </td>
            </tr>
            <tr>
              <th>Amount Paid</th>
              <td>
                <textarea
                  name="pricePaid"
                  type="text"
                  placeholder="pricePaid"
                  value={pricePaid}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Send Email</button>
      </form>

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
