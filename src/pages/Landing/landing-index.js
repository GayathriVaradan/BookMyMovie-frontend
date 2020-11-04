/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useEffect } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { useNavigate } from "@reach/router";
import AppContext from "../../store/context";

const Wrapper = styled.section`
 background: url("https://catalog.cinema-api.com/cf/images/ncg-images/2c8feb2fd91f45ffbff6f5374acc08cf.jpg?width=800&amp;version=702AA8E2086C72A31809104200990765") center top / cover no-repeat;'
`;
const LandingPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const { movies } = state;
  const navigate = useNavigate();

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
      <div>
        <Wrapper>
          <Carousel center="true" autoPlay width="350px">
            {movies.map((eachMovie) => (
              <div>
                <img alt="" src={eachMovie.posterurl} />
                <button
                  type="button"
                  label="button"
                  value={eachMovie._id}
                  onClick={() => {
                    dispatch({ type: "setSelectedMovie", data: eachMovie });
                    navigate("./selectedMovie");
                  }}
                >
                  Book Tickets
                </button>
                <p className="legend">{eachMovie.title}</p>
              </div>
            ))}
          </Carousel>
        </Wrapper>
      </div>
    </div>
  );
};

export default LandingPage;
