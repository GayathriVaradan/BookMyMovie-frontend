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
    case "setTheaters":
      return {
        ...state,
        theaters: action.data,
      };
    case "setSelectedTheater":
      return {
        ...state,
        selectedTheater: action.data,
      };
    case "setNumberOfTickets":
      return {
        ...state,
        numberOfTickets: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
