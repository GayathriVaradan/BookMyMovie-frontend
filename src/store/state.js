const state = {
  movies: [
    {
      _id: "",
      theaterNames: "",
      title: "",
      year: "",
      genre: [],
      theaters: [],
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
  datesAndTheaters: [
    {
      date: "",
      title: "",
      theater: [
        {
          theaterName: "",
          shows: [
            {
              show: "",
              time: "",
              seatsUnavaible: "",
            },
          ],
        },
      ],
    },
  ],
  selectedDate: {},
  selectedTheater: [],
  selectedShow: {},
  numberOfTickets: {},
  selectedSeats: {},
};

export default state;
