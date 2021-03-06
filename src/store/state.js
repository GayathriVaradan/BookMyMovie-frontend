const state = {
  movies: [
    {
      _id: "",
      theaterNames: "",
      title: "",
      trailer: "",
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
      _id: "",
      date: "",
      title: "",
      theater: [
        {
          theaterName: "",
          shows: [
            {
              show: "",
              time: "",
            },
          ],
        },
      ],
    },
  ],
  seatsUnavailableDetails: [
    {
      _id: "",
      theater_Id: "",
      title: "",
      theaterName: "",
      show: "",
      time: "",
      seatsUnavailable: [],
    },
  ],
  selectedDate: {},
  selectedTheater: [],
  selectedShow: {},
  numberOfTickets: {},
  selectedSeats: [],
  dataForBackend: {},
  firstName: {},
  lastName: {},
  email: {},
  pricePaid: {},
};

export default state;
