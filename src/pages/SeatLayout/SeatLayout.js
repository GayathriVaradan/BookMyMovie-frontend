/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";
import "./SeatLayout.css";

function SeatLayout() {
  const { state, dispatch } = useContext(AppContext);
  const [allSeatsSelected, setAllSeatsSelected] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [seatSelectionAllowed, setSeatSelectionAllowed] = useState(false);
  // eslint-disable-next-line prefer-const
  let [sortedSeatsArray, setSortedSeatsArray] = useState([]);
  let available = true;
  // const isItChecked = 0;
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
    seatsUnavailableDetails,
  } = state;
  // const [isTheSeatAvaiable, setIsTheSeatAvailable] = useState(true);
  const navigate = useNavigate();

  const isItAvailable = (value) => {
    available = seatsUnavailableDetails.seatsUnavailable.find((seat) => {
      return seat === value;
    });
    if (available) {
      return true;
    }
    return false;
  };
  const selectedCheckBox = (item, e) => {
    if (e.target.type === "checkbox" && e.target.checked) {
      seatsArrayList.push(item);
    } else if (e.target.type === "checkbox" && !e.target.checked) {
      for (let i = 0; i < seatsArrayList.length; i++) {
        if (seatsArrayList[i] === item) {
          seatsArrayList.splice(i, 1);
        }
      }
    }
    const temp = numberOfTickets - seatsArrayList.length;
    if (temp === 0) {
      setSortedSeatsArray(seatsArrayList);
      setSeatSelectionAllowed(true);
      setAllSeatsSelected(false);
    }
  };
  return (
    <div>
      <div> Movie : {selectedMovie.title}</div>
      <div> Theater : {selectedTheater.theaterName}</div>
      <div>Show: {selectedShow.show}</div>
      <div> Number of tickets: {numberOfTickets}</div>
      <div>
        Seats Unavailable:
        {seatsUnavailableDetails.seatsUnavailable.map((oneSeat) => (
          <> {oneSeat}</>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            {firstRow.map((item) => (
              <>
                <td key={item}>
                  <label
                    className="seats"
                    onChange={(e) => {
                      selectedCheckBox(item, e);
                    }}
                  >
                    <input
                      className="largeCheckBox"
                      type="checkbox"
                      name="checkbox"
                      value="item"
                      hidden={isItAvailable(item)}
                      disabled={seatSelectionAllowed}
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
                <td key={item}>
                  <label
                    className="seats"
                    onChange={(e) => {
                      selectedCheckBox(item, e);
                    }}
                  >
                    <input
                      className="largeCheckBox"
                      type="checkbox"
                      name="checkbox"
                      value="item"
                      hidden={isItAvailable(item)}
                      disabled={seatSelectionAllowed}
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
                <td key={item}>
                  <label
                    className="seats"
                    onChange={(e) => {
                      selectedCheckBox(item, e);
                    }}
                  >
                    <input
                      className="largeCheckBox"
                      type="checkbox"
                      name="checkbox"
                      value="item"
                      hidden={isItAvailable(item)}
                      disabled={seatSelectionAllowed}
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
                <td key={item}>
                  <label
                    className="seats"
                    onChange={(e) => {
                      selectedCheckBox(item, e);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="largeCheckBox"
                      name="checkbox"
                      value="item"
                      hidden={isItAvailable(item)}
                      disabled={seatSelectionAllowed}
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
                <td key={item}>
                  <label
                    className="seats"
                    onChange={(e) => {
                      selectedCheckBox(item, e);
                    }}
                  >
                    <input
                      className="largeCheckBox"
                      type="checkbox"
                      name="checkbox"
                      value="item"
                      hidden={isItAvailable(item)}
                      disabled={seatSelectionAllowed}
                    />
                    {item}
                  </label>
                </td>
              </>
            ))}
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => {
          sortedSeatsArray = sortedSeatsArray.sort((a, b) => {
            return a - b;
          });
          dispatch({
            type: "setSelectedSeats",
            data: sortedSeatsArray,
          });
          navigate("./emailReservation");
        }}
        disabled={allSeatsSelected}
      >
        Continue
      </button>
    </div>
  );
}
export default SeatLayout;
