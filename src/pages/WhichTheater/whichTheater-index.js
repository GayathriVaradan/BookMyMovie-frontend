/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import { useNavigate } from "@reach/router";
import axios from "axios";
import AppContext from "../../store/context";
import WhichShow from "../WhichShow/whichShow";

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
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie, theaters } = state;
  const [showOptions, setShowOptions] = useState(-1);
  // const navigate = useNavigate();

  useEffect(() => {
    if (!theaters.length) {
      const getTheaters = async () => {
        const response = await axios.get(
          "http://localhost:5050/api/v1/theaters"
        );
        const theatersData = await response.data;
        if (theatersData) {
          dispatch({ type: "setTheaters", data: theatersData });
        }
      };
      getTheaters();
    }
  }, [theaters, dispatch]);
  if (selectedMovie) {
    return (
      <div>
        <div>
          <label>
            <h4>For the Movie : {selectedMovie.title}</h4>
          </label>
        </div>

        {theaters.map((eachTheater, index) => (
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
        ))}
      </div>
    );
  }
  return <>loading</>;
}
export default WhichTheater;
