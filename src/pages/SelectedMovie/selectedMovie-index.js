/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from "react";
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
function SelectedMovie() {
  // Declare a new state variable, which we'll call "count"
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie } = state;
  const navigate = useNavigate();

  return (
    <div>
      <div>Genre :{selectedMovie.title}</div>
      <div>
        Year:
        {selectedMovie.year}
      </div>

      <div>Genre :{selectedMovie.genre}</div>
      <div>Rating :{selectedMovie.contentRating}</div>
      <div>Release Date :{selectedMovie.releaseDate}</div>
      <div>Story Line :{selectedMovie.storyline}</div>
      <div>imdb Rating :{selectedMovie.imdbRating}</div>
      <img alt="" src={selectedMovie.posterurl} />

      <Button
        type="button"
        onClick={() => {
          dispatch({ type: "setSelectedMovie", data: selectedMovie });
          navigate("./whichTheater");
        }}
      >
        Book Tickets
      </Button>
    </div>
  );
}
export default SelectedMovie;
