import React, { useContext, useEffect } from "react";
import axios from "axios";
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
function WhichTheater() {
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie, theaters } = state;
  const navigate = useNavigate();
  useEffect(() => {
    async function getTheaters() {
      const response = await axios.get("http://localhost:5050/api/v1/theaters");
      const theatersData = await response.data;
      if (theaters) {
        dispatch({ type: "setTheaters", data: theatersData });
      }
    }
    getTheaters();
  }, [theaters, dispatch]);
  return (
    <div>
      {theaters.map((eachTheater) => (
        <div>
          {eachTheater.name}
          <Button
            type="button"
            label="button"
            value={eachTheater._id}
            onClick={() => {
              dispatch({ type: "setSelectedTheater", data: eachTheater });
              navigate("./bookTickets");
            }}
          >
            Select Number Of Tickets
          </Button>
          {selectedMovie.title}
        </div>
      ))}
    </div>
  );
}
export default WhichTheater;
