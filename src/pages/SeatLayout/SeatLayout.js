/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";

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
  const { selectedMovie, selectedTheater, numberOfTickets } = state;

  const navigate = useNavigate();

  return (
    <div>
      <div>For the Movie : {selectedMovie.title}</div>
      <div>For the theater : {selectedTheater.theaterName}</div>
      <img alt="" src={selectedMovie.posterurl} />
      Number of tickets: {numberOfTickets}
      {selectedTheater.seats.map((seats) => (
        <div>
          <form>
            <label>
              {seats.seatNumber}
              <input
                type="checkbox"
                onClick={() => {
                  console.log(seats.seatNumber);
                }}
              />
            </label>
          </form>
        </div>
      ))}
      {/* <div style={{ marginTop: "100px" }}>
        <SeatPicker
          rows={rows}
          maxReservableSeats={3}
          alpha
          visible
          selectedByDefault
        />
      </div> */}
      <Button
        type="button"
        onClick={() => {
          dispatch({ type: "setSelectedSeats", data: selectedMovie });
          navigate("./whichTheater");
        }}
      >
        Continue
      </Button>
    </div>
  );
}
export default SeatLayout;
