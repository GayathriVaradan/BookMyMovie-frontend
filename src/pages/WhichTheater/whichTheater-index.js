/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "@reach/router";
import axios from "axios";
import AppContext from "../../store/context";
import "./whichTheater-index.css";

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
function WhichTheater() {
  const [theatersForTheDate, setTheatersForTheDate] = useState([]);
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie, datesAndTheaters } = state;
  const [showOptions, setShowOptions] = useState(false);
  // const [showTimings, setShowTimings] = useState(-1);
  const [combinedDatesAndDay, setCombinedDatesAndDay] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (datesAndTheaters.length > 0) {
      const getTheaters = async () => {
        const response = await axios.get(
          `http://localhost:5050/api/v1/theaters/${selectedMovie.title}`
        );
        const datesAndTheatersData = await response.data;
        if (datesAndTheatersData) {
          dispatch({ type: "setDatesAndTheaters", data: datesAndTheatersData });
        }
      };
      getTheaters();
    }
  }, [datesAndTheaters, dispatch, selectedMovie.title]);
  const loadDatesWithDays = () => {
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    datesAndTheaters.map((test) => {
      for (let i = 0; i < 8; i++) {
        const today = new Date();
        today.setDate(today.getDate() + i);
        const dd = today.getDate();
        const mm = today.getMonth() + 1;
        const y = today.getFullYear();
        const day = today.getDay();
        if (weekday[day] === test.date) {
          combinedDatesAndDay.push(`${dd}/${mm}/${y}  ${weekday[day]}`);
          setCombinedDatesAndDay(combinedDatesAndDay);
          // console.log("combinedDatesAndDay : ", combinedDatesAndDay);
        }
      }
      return combinedDatesAndDay;
    });
  };
  const selectDate = (e) => {
    const filteredDatesAndTheaters = datesAndTheaters.filter((item) => {
      return item.date === e.target.value;
    });
    dispatch({
      type: "setSelectedDate",
      data: e.target.value,
    });
    loadDatesWithDays();
    setTheatersForTheDate(filteredDatesAndTheaters);
    setShowOptions(true);
  };
  return (
    <div>
      <div>
        <label>
          <h4>Movie : {selectedMovie.title}</h4>
        </label>
        <div>
          <h4>Choose a Date:&nbsp;</h4>
          <select
            value={datesAndTheaters.date}
            onChange={(e) => {
              selectDate(e);
            }}
          >
            <option>--select Date--</option>
            {datesAndTheaters.map((eachDate) => (
              <option value={eachDate.date} key={eachDate.date}>
                {eachDate.date}
              </option>
            ))}
          </select>
        </div>
        <div>
          {showOptions && (
            <div>
              {theatersForTheDate.map((eachTheaterForTheDate) => (
                <div key={eachTheaterForTheDate}>
                  {eachTheaterForTheDate.theater.map((eachTheater) => (
                    <div key={eachTheater.theaterName}>
                      <table className="theaterList">
                        <thead>
                          <tr>
                            <th className="thForTheaterList" colSpan="4">
                              {eachTheater.theaterName}
                            </th>
                          </tr>
                        </thead>

                        {eachTheater.shows.map((eachShow) => (
                          <tbody key={eachShow.time}>
                            <tr
                              onClick={() => {
                                dispatch({
                                  type: "setSelectedTheater",
                                  data: eachTheater,
                                });
                                dispatch({
                                  type: "setSelectedShow",
                                  data: eachShow,
                                });
                                dispatch({
                                  type: "setDataForBackend",
                                  data: eachTheaterForTheDate,
                                });
                                navigate("./noOfTickets");
                              }}
                            >
                              <td className="tdForTheaterList">
                                {eachShow.time}
                              </td>
                              <td className="tdForTheaterList">
                                {eachShow.show}
                              </td>
                              <td className="tdForTheaterList">
                                <Button
                                  onClick={() => {
                                    dispatch({
                                      type: "setSelectedTheater",
                                      data: eachTheater,
                                    });
                                    dispatch({
                                      type: "setSelectedShow",
                                      data: eachShow,
                                    });
                                    dispatch({
                                      type: "setDataForBackend",
                                      data: eachTheaterForTheDate,
                                    });

                                    navigate("./noOfTickets");
                                  }}
                                >
                                  Buy Tickets
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* {theaters.map((eachTheater, index) => (
          <div>
            <Button
              key={eachTheater._id}
              value={eachTheater.theaterNames}
              onClick={() => setShowOptions(index)}
            >
              {eachTheater.theaterNames}
            </Button>
            {showOptions === index && <WhichShow options={eachTheater} />}
          </div>
        ))} */}
    </div>
  );
}
export default WhichTheater;
