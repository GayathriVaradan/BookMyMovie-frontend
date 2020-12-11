import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player/youtube";
import AppContext from "../../store/context";
import "./index.css";
import { Wrapper, FullImage } from "./style";

function SelectedMovie() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { selectedMovie } = state;
  const [showPoster, setShowPoster] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="selectedMovie">
      <Wrapper>
        <FullImage>
          <ReactPlayer
            onPlay={() => {
              setShowPoster(false);
            }}
            onPause={() => {
              setShowPoster(true);
            }}
            url={selectedMovie.trailer}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  showinfo: 1,
                  controls: 1,
                  disablekb: 1,
                  listType: 1,
                  playlist: 1,
                },
              },
            }}
          />
        </FullImage>
        {showPoster && (
          <img alt="" src={selectedMovie.poster} className="posterImage" />
        )}
      </Wrapper>

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
    </div>
  );
}
export default SelectedMovie;
