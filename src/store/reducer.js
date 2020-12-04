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
    case "setDataForBackend":
      return {
        ...state,
        dataForBackend: action.data,
      };
    case "setSeatsUnavailableDetails":
      return {
        ...state,
        seatsUnavailableDetails: action.data,
      };
    case "setFirstName":
      return {
        ...state,
        firstName: action.data,
      };
    case "setLastName":
      return {
        ...state,
        lastName: action.data,
      };
    case "setEmail":
      return {
        ...state,
        email: action.data,
      };
    case "setPricePaid":
      return {
        ...state,
        pricePaid: action.data,
      };
    case "setPaymentStatus":
      return {
        ...state,
        paymentStatus: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
