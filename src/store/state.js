const state = {
  movies: [
    {
      _id: "",
      title: "",
      year: "",
      genre: [],
      poster: "",
      contentRating: "",
      duration: "",
      releaseDate: "",
      storyline: "",
      actors: [],
      imdbRating: 0,
      posterurl: "",
    },
  ],
  selectedMovie: {},
  theaters: [
    {
      _id: "",
      name: "",
      numberOfSeats: 0,
    },
  ],
  selectedTheater: {},
  numberOfTickets: {},
};

export default state;
