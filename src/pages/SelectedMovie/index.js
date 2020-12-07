import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

function SelectedMovie() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie } = state;
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        className="commonButton"
        onClick={() => {
          dispatch({ type: "setSelectedMovie", data: selectedMovie });
          navigate("./whichTheater");
        }}
      >
        {t("Select Date and Theater")}
      </button>
      <img alt="" src={selectedMovie.poster} />

      <p>Title : {selectedMovie.title}</p>
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
        <div>
          {selectedMovie.actors.map((actor) => (
            <p key={actor}>{actor}</p>
          ))}
        </div>
      </p>
    </div>
  );
}
export default SelectedMovie;
