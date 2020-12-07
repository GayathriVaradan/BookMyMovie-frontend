import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

const LandingPage = () => {
  const { t } = useTranslation();

  const { state, dispatch } = useContext(AppContext);
  const { movies } = state;
  const navigate = useNavigate();
  const [movieName, setName] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [
    showErrorMsgForSearchedMovie,
    setShowErrorMsgForSearchedMovie,
  ] = useState(false);

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
        className="search"
        placeholder={t("Search for a Movie")}
      />
      {showErrorMsg && (
        <div className="errorMessage">
          {t("Please select a movie and click Search")}
        </div>
      )}
      {showErrorMsgForSearchedMovie && (
        <div className="errorMessage">
          {t(
            "Sorry! This movie is not played in Stockholm. Please search for another movie."
          )}
        </div>
      )}
      &nbsp;
      <button
        type="button"
        className="commonButton"
        onClick={() => {
          if (movieName) {
            const searchedMovie = axios.get(
              `http://localhost:5050/api/v1/movies/title/${movieName}`
            );
            movies.map((eachMovie) => {
              if (eachMovie.title === movieName) {
                dispatch({ type: "setSelectedMovie", data: eachMovie });
                navigate("./selectedMovie");
              }
              if (eachMovie.title !== movieName) {
                setShowErrorMsgForSearchedMovie(true);
              }
              return searchedMovie;
            });
            setShowErrorMsg(false);
          } else {
            setShowErrorMsgForSearchedMovie(false);
            setShowErrorMsg(true);
          }
        }}
      >
        {t("Search for a Movie")}
      </button>
      <Carousel
        autoPlay="true"
        infiniteLoop="true"
        dynamicHeight="true"
        className="carousel"
      >
        {movies.map((eachMovie) => (
          <div key={eachMovie}>
            <img alt="" src={eachMovie.posterurl} />
            <p
              className="legend"
              onClick={() => {
                dispatch({ type: "setSelectedMovie", data: eachMovie });
                navigate("./selectedMovie");
              }}
              aria-hidden
            >
              {eachMovie.title}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LandingPage;
