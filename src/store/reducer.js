const reducer = (state, action) => {
  switch (action.type) {
    case "setMoviesList":
      return {
        ...state,
        movies: action.data,
      };
    case "setSelectedMovie":
      return {
        ...state,
        selectedMovie: action.data,
      };
    case "setDatesAndTheaters":
      return {
        ...state,
        datesAndTheaters: action.data,
      };
    case "setSelectedDate":
      return {
        ...state,
        selectedDate: action.data,
      };
    case "setSelectedTheater":
      return {
        ...state,
        selectedTheater: action.data,
      };
    case "setSelectedShow":
      return {
        ...state,
        selectedShow: action.data,
      };
    case "setNumberOfTickets":
      return {
        ...state,
        numberOfTickets: action.data,
      };
    case "setSelectedSeats":
      return {
        ...state,
        selectedSeats: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
