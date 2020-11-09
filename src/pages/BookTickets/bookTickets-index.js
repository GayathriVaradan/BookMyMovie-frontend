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
  const {
    selectedTheater,
    selectedMovie,
    // numberOfTickets,
  } = state;
  const navigate = useNavigate();
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div>
        Number Of tickets :<Button onClick={decrement}> -</Button> {count}
        <Button onClick={increment}>+</Button>
      </div>
      <div>For the Movie : {selectedMovie.title}</div>
      <div>For the theater : {selectedTheater.theaterName}</div>

      <Button
        type="button"
        onClick={() => {
          dispatch({ type: "setNumberOfTickets", data: count });
          navigate("./seatLayout");
        }}
      >
        Select seats
      </Button>
    </div>
  );
}
export default BookTickets;
