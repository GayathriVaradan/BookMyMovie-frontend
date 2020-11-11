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
  const seatsArrayList = [];
  const firstRow = [1, 2, 3, 4, 5];
  const secondRow = [6, 7, 8, 9, 10];
  const thirdRow = [11, 12, 13, 14, 15];
  const fourthRow = [16, 17, 18, 19, 20];
  const fifthRow = [21, 22, 23, 24, 25];
  const {
    selectedMovie,
    selectedTheater,
    selectedShow,
    numberOfTickets,
  } = state;
  // const [isTheSeatAvaiable, setIsTheSeatAvailable] = useState(true);
  const navigate = useNavigate();

  const isItAvailable = (value) => {
    const available = selectedShow.seatsUnavailable.find((item) => {
      return item === value;
    });
    if (available) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <div> Movie : {selectedMovie.title}</div>
      <div> Theater : {selectedTheater.theaterName}</div>
      <div>Show: {selectedShow.show}</div>
      <div> Number of tickets: {numberOfTickets}</div>
      <div>Seats Unavailable: {selectedShow.seatsUnavailable}</div>
      <table>
        <tr>
          {firstRow.map((item) => (
            <>
              <td>
                <label
                  className="seats"
                  onChange={() => {
                    seatsArrayList.push(item);
                  }}
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="item"
                    disabled={isItAvailable(item)}
                  />
                  {item}
                </label>
              </td>
            </>
          ))}
        </tr>
        <tr>
          {secondRow.map((item) => (
            <>
              <td>
                <label
                  className="seats"
                  onChange={() => {
                    seatsArrayList.push(item);
                  }}
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="item"
                    disabled={isItAvailable(item)}
                  />
                  {item}
                </label>
              </td>
            </>
          ))}
        </tr>
        <tr>
          {thirdRow.map((item) => (
            <>
              <td>
                <label
                  className="seats"
                  onChange={() => {
                    seatsArrayList.push(item);
                  }}
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="item"
                    disabled={isItAvailable(item)}
                  />
                  {item}
                </label>
              </td>
            </>
          ))}
        </tr>
        <tr>
          {fourthRow.map((item) => (
            <>
              <td>
                <label
                  className="seats"
                  onChange={() => {
                    seatsArrayList.push(item);
                  }}
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="item"
                    disabled={isItAvailable(item)}
                  />
                  {item}
                </label>
              </td>
            </>
          ))}
        </tr>
        <tr>
          {fifthRow.map((item) => (
            <>
              <td>
                <label
                  className="seats"
                  onChange={() => {
                    seatsArrayList.push(item);
                  }}
                >
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="item"
                    disabled={isItAvailable(item)}
                  />
                  {item}
                </label>
              </td>
            </>
          ))}
        </tr>
      </table>
      <Button
        type="button"
        onClick={() => {
          dispatch({ type: "setSelectedSeats", data: seatsArrayList });
          navigate("./emailReservation");
        }}
      >
        Continue
      </Button>
    </div>
  );
}
export default SeatLayout;
