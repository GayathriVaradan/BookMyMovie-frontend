/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import emailjs from "emailjs-com";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import AppContext from "../../store/context";
import "./emailReservation-index.css";

function EmailReservation() {
  // Declare a new state variable, which we'll call "count"
  const { state, dispatch } = useContext(AppContext);
  const price = 100;
  const [paymentStatus, setPaymentStatus] = useState();
  const {
    dataForBackend,
    selectedMovie,
    selectedDate,
    selectedTheater,
    selectedShow,
    selectedSeats,
    seatsUnavailableDetails,
  } = state;
  const navigate = useNavigate();
  const makePayment = async (token) => {
    try {
      const response = await axios.post("http://localhost:5050/payment", {
        token,
        price,
        selectedMovie,
      });
      setPaymentStatus(response.data.charge.status);
      console.log("make payment", response);
    } catch (error) {
      console.log("make payment", error);
    }
  };
  function sendEmail(e) {
    e.preventDefault();
    console.log("charge sendEmail: ", paymentStatus);

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
      <>
        <form className="contact-form" onSubmit={sendEmail}>
          <table className="emailtable">
            <tbody>
              <tr>
                <th>
                  <label htmlFor="movieTitle">Movie :</label>
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
                  <label htmlFor="selectedDate">Date :</label>
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
                  <label htmlFor="selectedTheater"> Theater :</label>
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
                  <label htmlFor="selectedShow">Show : </label>
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
                  <label htmlFor="selectedSeats">Seats : </label>
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
                <th>First Name</th>
                <td>
                  <input name="first" type="text" placeholder="First Name" />
                </td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>
                  <input name="last" type="text" placeholder="Last Name" />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <input name="user_email" type="text" placeholder="Email" />
                </td>
              </tr>
            </tbody>
          </table>

          <StripeCheckout
            stripeKey="pk_test_51HmbeNKaGaw448OOF6cpgckz29IJwEZoZRVZTsaD97tC1quYXeML6dd3auAjpO4wWEg1VDLlpiU3CxKSM2vjiM5z00Vuf0aY6t"
            token={makePayment}
            name="Book the Movie"
            amount={price}
          >
            <button
              type="submit"
              value="Send"
              onClick={() => {
                // if (paymentStatus === "succeeded") {
                console.log("Pay button : ", paymentStatus);

                selectedSeats.forEach((selectedSeat) => {
                  seatsUnavailableDetails.seatsUnavailable.push(selectedSeat);
                });

                dispatch({
                  type: "setSeatsUnavailableDetails",
                  data: seatsUnavailableDetails,
                });

                const theaterUpdate = axios.patch(
                  `http://localhost:5050/api/v1/seatsUnavailable/theater_id/${dataForBackend._id}/theaterName/${selectedTheater.theaterName}/show/${selectedShow.show}`,
                  seatsUnavailableDetails.seatsUnavailable
                );
                console.log(theaterUpdate);
                navigate("./thankYou");
                // }
              }}
            >
              Pay
            </button>
          </StripeCheckout>
        </form>
      </>
    </div>
  );
}
export default EmailReservation;
