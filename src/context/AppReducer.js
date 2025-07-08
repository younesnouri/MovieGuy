export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      const toadd = { ...action.payload.movie, priority: action.payload.priority }
      return {
        ...state,
        watchlist: [toadd, ...state.watchlist],
      }

    case 'SET_MOVIES':

      return { ...state, watchlist: action.payload };

    case "CLEAR_WATCHLIST":
      return { ...state, watchlist: [] };

    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      }

    case "CLEAR_WATCHED":
      return { ...state, watched: [] };

    case "ADD_MOVIE_TO_ACTIVITY":
      return {
        ...state,
        activity: [action.payload, ...state.activity],
      }

    case "CLEAR_ACTIVITY":
      return { ...state, activity: [] };



    case "ADD_MOVIE_TO_FAVORITE":
      return {
        ...state,
        favorite: [action.payload, ...state.favorite],
      }

    case "CLEAR_FAVORITE":
      return { ...state, favorite: [] };

    case "ADD_REVIEW_TO_LIST":
      return {
        ...state,
        reviewlist: [...state.reviewlist, action.payload],
      }

    case "CLEAR_REVIEWLIST":
      return { ...state, reviewlist: [] };

    default:
      return state;
  }
}