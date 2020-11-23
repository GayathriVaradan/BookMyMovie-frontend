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

      <p>Genre : {selectedMovie.title}</p>
      <p>Year: {selectedMovie.year}</p>
      <p>
        Genre :
        {selectedMovie.genres.map((oneGenre) => (
          <p key={oneGenre}>{oneGenre}</p>
        ))}
      </p>
      <p>Rating : {selectedMovie.contentRating}</p>
      <p>Release Date : {selectedMovie.releaseDate}</p>
      <p>Story Line : {selectedMovie.storyline}</p>
      <p>imdb Rating : {selectedMovie.imdbRating}</p>
      <p>
        Actors:
        <p>
          {selectedMovie.actors.map((actor) => (
            <p key={actor}>{actor}</p>
          ))}
        </p>
      </p>
    </div>
  );
}
export default SelectedMovie;
