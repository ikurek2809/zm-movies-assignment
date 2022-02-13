import * as actionTypes from "../actions/actionTypes";


const initialState = {
  token: "",
  loginError: {},
  movies: [],
  movieToEdit: {}

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TOKEN:
      return saveToken(state, action);
    case actionTypes.SAVE_LOGIN_ERROR:
      return saveLoginError(state, action);
    case actionTypes.SAVE_MOVIES:
      return saveMovies(state, action);
    case actionTypes.SAVE_MOVIE_TO_EDIT:
      return saveMovieToEdit(state, action);
    case actionTypes.LOGOUT_USER:
      return logoutUser(state, action);

  }
  return state;
};

const saveToken = (state, action) => {
  return {
    ...state,
    token: action.token,
  };
};

const saveLoginError = (state, action) => {
  return {
    ...state,
    loginError: action.loginError,
  };
};

const saveMovies = (state, action) => {
  return {
    ...state,
    movies: action.movies,
  };
};

const saveMovieToEdit = (state, action) => {
  return {
    ...state,
    movieToEdit: action.movie,
  };
};

const logoutUser = (state, action) => {
  return {
    ...state,
    token: "",
  };
};

export default reducer;