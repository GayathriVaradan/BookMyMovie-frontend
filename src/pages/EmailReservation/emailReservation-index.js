/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "@reach/router";
import emailjs from "emailjs-com";
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
  const {
    selectedMovie,
    selectedDate,
    selectedTheater,
    selectedShow,
    selectedSeats,
  } = state;
  const navigate = useNavigate();
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
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  return (
    <div>
      <div>Movie : {selectedMovie.title}</div>
      <div>Date : {selectedDate}</div>
      <div>Theater : {selectedTheater.theaterName}</div>
      <div>Show : {selectedShow.show}</div>
      <div>Seats : {selectedSeats}</div>
      <>
        <form className="contact-form" onSubmit={sendEmail}>
          <table className="emailtable">
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
          </table>

          <Button
            type="submit"
            value="Send"
            onClick={() => {
              dispatch({ type: "setSelectedMovie", data: selectedMovie });
              navigate("./");
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
