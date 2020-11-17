/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "@reach/router";
import emailjs from "emailjs-com";
import StripeCheckout from "react-stripe-checkout";
import AppContext from "../../store/context";
import "./emailReservation-index.css";

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;
function EmailReservation() {
  // Declare a new state variable, which we'll call "count"
  const { state, dispatch } = useContext(AppContext);
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook",
  });
  const {
    selectedMovie,
    selectedDate,
    selectedTheater,
    selectedShow,
    selectedSeats,
  } = state;
  const navigate = useNavigate();
  console.log(setProduct);
  function sendEmail(e) {
    e.preventDefault();

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
  const makePayment = (token) => {
    const body = {
      token,
      product,
      selectedMovie,
      selectedDate,
      selectedTheater,
      selectedShow,
      selectedSeats,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:5050/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((error) => console.log(error));
  };
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
            amount={product.price}
          />
          <Button
            type="submit"
            value="Send"
            onClick={() => {
              selectedSeats.forEach((selectedSeat) => {
                selectedShow.seatsUnavailable.push(selectedSeat);
              });

              dispatch({ type: "setSelectedShow", data: selectedShow });
              navigate("./thankYou");
            }}
          >
            Pay
          </Button>
        </form>
      </>
    </div>
  );
}
export default EmailReservation;
