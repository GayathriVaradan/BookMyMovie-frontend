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
              const filteredDatesAndTheaters = datesAndTheaters.filter(
                (item) => {
                  return item.date === e.target.value;
                }
              );
              let currentDate = new Date();
              const dd = String(currentDate.getDate());
              const mm = String(currentDate.getMonth());
              const yyyy = currentDate.getFullYear();
              const weekday = new Array(7);
              weekday[0] = "Sunday";
              weekday[1] = "Monday";
              weekday[2] = "Tuesday";
              weekday[3] = "Wednesday";
              weekday[4] = "Thursday";
              weekday[5] = "Friday";
              weekday[6] = "Saturday";
              const day = weekday[currentDate.getDay()];

              currentDate = `${mm}/${dd}/${yyyy}  ${day}`;

              console.log(currentDate);
              dispatch({
                type: "setSelectedDate",
                data: e.target.value,
              });
              setTheatersForTheDate(filteredDatesAndTheaters);
              setShowOptions(true);
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
