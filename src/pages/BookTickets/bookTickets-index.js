/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import styled from "styled-components";
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
function BookTickets() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const { state, dispatch } = useContext(AppContext);
  const { selectedTheater, selectedMovie } = state;
  const navigate = useNavigate();
  return (
    <div>
      <div>Number Of tickets :{count}</div>
      <div>For the Movie : {selectedMovie}</div>
      <div>For the theater : {selectedTheater}</div>
      <Button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
      <Button
        type="button"
        onClick={() => {
          dispatch({ type: "setNumberOfTickets", data: count });
          navigate("./seatLayout");
        }}
      >
        Book Tickets
      </Button>
    </div>
  );
}
export default BookTickets;
