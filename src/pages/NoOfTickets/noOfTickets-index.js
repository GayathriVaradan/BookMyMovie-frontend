/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "@reach/router";
import axios from "axios";
import AppContext from "../../store/context";

import "./noOfTickets-index.css";

function NoOfTickets() {
  const [count, setCount] = useState(0);
  const { state, dispatch } = useContext(AppContext);
  const {
    dataForBackend,
    selectedTheater,
    selectedMovie,
    selectedShow,
    seatsUnavailableDetails,
  } = state;
  const navigate = useNavigate();
  useEffect(() => {
    async function getSeatsUnavailableDetails() {
      const response = await axios.get(
        `http://localhost:5050/api/v1/seatsUnavailable/theater_id/${dataForBackend._id}/theaterName/${selectedTheater.theaterName}/show/${selectedShow.show}`
      );
      const seatsUnavailableDetailsData = await response.data;
      if (seatsUnavailableDetailsData) {
        dispatch({
          type: "setSeatsUnavailableDetails",
          data: seatsUnavailableDetailsData,
        });
      }
    }
    getSeatsUnavailableDetails();
  }, [
    seatsUnavailableDetails,
    dispatch,
    dataForBackend._id,
    selectedTheater.theaterName,
    selectedShow.show,
  ]);
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
  const block = (value) => {
    if (value === 5) {
      return true;
    }
    return false;
  };
  const showButton = (value) => {
    if (!value) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <div>
        Number Of tickets :
        <button className="buttonStyle" type="button" onClick={decrement}>
          -
        </button>
        {count}
        <button
          className="buttonStyle"
          type="button"
          onClick={increment}
          disabled={block(count)}
        >
          +
        </button>
      </div>
      <div>Movie : {selectedMovie.title}</div>
      <div>Theater : {selectedTheater.theaterName}</div>
      <div>Show : {selectedShow.show}</div>
      <button
        type="button"
        className="buttonStyle"
        onClick={() => {
          dispatch({ type: "setNumberOfTickets", data: count });
          navigate("./seatLayout");
        }}
        disabled={showButton(count)}
      >
        Select seats
      </button>
    </div>
  );
}
export default NoOfTickets;
