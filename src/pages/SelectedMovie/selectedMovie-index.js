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
      <Button
        type="button"
        onClick={() => {
          dispatch({ type: "setSelectedMovie", data: selectedMovie });
          navigate("./whichTheater");
        }}
      >
        Select Date and Theater
      </Button>
      <img alt="" src={selectedMovie.poster} />

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
      <div>
        Actors:
        <div>
          {selectedMovie.actors.map((actor) => (
            <h6 key={actor}>{actor}</h6>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SelectedMovie;
