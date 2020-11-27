/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";
import "./landing-index-style.css";

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
const LandingPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const { movies } = state;
  const navigate = useNavigate();
  const [movieName, setName] = useState("");

  useEffect(() => {
    async function getMovies() {
      const response = await axios.get("http://localhost:5050/api/v1/movies");
      const moviesData = await response.data;
      if (moviesData) {
        dispatch({ type: "setMoviesList", data: moviesData });
      }
    }
    getMovies();
  }, [movies, dispatch]);

  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={movieName}
        placeholder="Search for a Movie"
      />
      &nbsp;
      <button
        type="button"
        className="button"
        onClick={() => {
          const searchedMovie = axios.get(
            `http://localhost:5050/api/v1/movies/title/${movieName}`
          );
          movies.map((eachMovie) => {
            if (eachMovie.title === movieName) {
              dispatch({ type: "setSelectedMovie", data: eachMovie });
              navigate("./selectedMovie");
            }
            return searchedMovie;
          });
        }}
      >
        Search
      </button>
      <Carousel
        autoPlay="true"
        infiniteLoop="true"
        dynamicHeight="true"
        className="carousel"
      >
        {movies.map((eachMovie) => (
          <div key={eachMovie}>
            <Button
              type="button"
              label="button"
              value={eachMovie._id}
              onClick={() => {
                dispatch({ type: "setSelectedMovie", data: eachMovie });
                navigate("./selectedMovie");
              }}
            >
              {eachMovie.title}
            </Button>
            <img
              alt=""
              src={eachMovie.posterurl}
              onClick={() => {
                dispatch({ type: "setSelectedMovie", data: eachMovie });
                navigate("./selectedMovie");
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LandingPage;
