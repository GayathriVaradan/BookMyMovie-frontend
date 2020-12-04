/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./emailReservation-index.css";

function EmailReservation() {
  const { t } = useTranslation();
  const [paymentStatus, setPaymentStatus] = useState();
  const { state, dispatch } = useContext(AppContext);
  const {
    dataForBackend,
    selectedMovie,
    selectedDate,
    selectedTheater,
    selectedShow,
    selectedSeats,
    numberOfTickets,
    seatsUnavailableDetails,
  } = state;
  const price = 10000 * numberOfTickets;

  const navigate = useNavigate();
  const makePayment = async (token) => {
    try {
      const response = await axios.post("http://localhost:5050/payment", {
        token,
        price,
        selectedMovie,
      });
      setPaymentStatus(response.data.charge.status);
      if (response.data.status === "success") {
        setTimeout(() => {
          dispatch({
            type: "setPaymentStatus",
            data: response.data.status,
          });
          dispatch({
            type: "setPricePaid",
            data: response.data.charge.amount / 10000,
          });
          navigate("./thankYou");
        }, 2000);
      } else {
        alert("error");
      }
      console.log("make payment", response);
    } catch (error) {
      console.log("make payment", error);
    }
  };

  return (
    <div>
      <>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
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
                  <input
                    name="first"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => {
                      dispatch({ type: "setFirstName", data: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("Last Name")}</th>
                <td>
                  <input
                    name="last"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => {
                      dispatch({ type: "setLastName", data: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>{t("Email")}</th>
                <td>
                  <input
                    name="user_email"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                      dispatch({ type: "setEmail", data: e.target.value });
                    }}
                  />
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
              className="commonButton"
              type="submit"
              value="Send"
              onClick={() => {
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
              }}
            >
              {t("Pay with Stripe")}
            </button>
          </StripeCheckout>
          <div>
            {t("Payment status")} :
            <textarea
              id="paymentStatus"
              name="paymentStatus"
              value={paymentStatus}
            />
          </div>
        </form>
      </>
    </div>
  );
}
export default EmailReservation;
