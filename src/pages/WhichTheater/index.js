import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

function WhichTheater() {
  const { t } = useTranslation();
  const [theatersForTheDate, setTheatersForTheDate] = useState([]);
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie, datesAndTheaters } = state;
  const [showOptions, setShowOptions] = useState(false);
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
          console.log("combinedDatesAndDay : ", combinedDatesAndDay);
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
        <div className="ticketLayout">
          <label htmlFor="movie">
            <h4>
              {t("Movie")} : {selectedMovie.title}
            </h4>
          </label>
        </div>
        <div>
          <h4>{t("Choose a Date")}:&nbsp;</h4>
          <select
            value={datesAndTheaters.date}
            onChange={(e) => {
              selectDate(e);
            }}
          >
            <option>--{t("select Date")}--</option>
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
                              className="tableDataForTheater"
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
                                <button
                                  type="button"
                                  className="commonButton"
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
                                  {t("Buy Tickets")}
                                </button>
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
    </div>
  );
}
export default WhichTheater;
