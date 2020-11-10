/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";
import "./SeatLayout.css";

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

function SeatLayout() {
  // Declare a new state variable, which we'll call "count"
  const { state, dispatch } = useContext(AppContext);
  const n = 26;
  let i;
  const seats = [];
  const {
    selectedMovie,
    selectedTheater,
    // datesAndTheaters,
    selectedShow,
    numberOfTickets,
  } = state;

  const navigate = useNavigate();
  function displaySeats() {
    for (i = 1; i < n; i++) {
      seats.push(i);
    }
  }
  return (
    <div>
      <div> Movie : {selectedMovie.title}</div>
      <div> Theater : {selectedTheater.theaterName}</div>
      <div>Show: {selectedShow.show}</div>
      <div> Number of tickets: {numberOfTickets}</div>
      {displaySeats()}
      {seats.map((item) => (
        <div>
          <table>
            <tr>
              <td>
                <input id="check" type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>{item}</td>
            </tr>
          </table>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          dispatch({ type: "setSelectedSeats", data: selectedMovie });
          navigate("./");
        }}
      >
        Continue
      </Button>
    </div>
  );
}
export default SeatLayout;
