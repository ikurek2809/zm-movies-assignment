import * as actionTypes from './actionTypes';
import moviesApi from "../../api/moviesApi";

export const saveToken = (token) => {
  return {
    type: actionTypes.SAVE_TOKEN,
    token: token,
  };
};

export const saveLoginError = (loginError) => {
  return {
    type: actionTypes.SAVE_LOGIN_ERROR,
    loginError: loginError,
  };
};

export const loginUser = (username, password, history) => {
  return (dispatch) => {
    moviesApi.post("/api/auth/local", {
      identifier: username,
      password: password
    })
      .then(response => {
        dispatch(saveToken(response.data.jwt))
        history.push('/movies')
      }).catch(error => {
      dispatch(saveLoginError(error.response.data.error))
    });
  }
};

export const createMovie = (movie, history, token) => {
  const formData = new FormData();
  formData.append("data", `{"name": "${movie.movieName}", "publicationYear": ${movie.publishingYear}}`)
  /*formData.append("files.poster", file)*/
  formData.append("files.poster", movie.file);
  return (dispatch) => {
    moviesApi.post("/api/movies",
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,

        },
      })
      .then(response => {
        history.push('/movies')
      }).catch(error => {
    });
  }
};

export const updateMovie = (movie, history, token) => {
  const formData = new FormData();
  formData.append("data", `{"name": "${movie.movieName}", "publicationYear": ${movie.publishingYear}}`);
  formData.append("files.poster", movie.file);
  return (dispatch) => {
    moviesApi.put("/api/movies/" + movie.id,
      formData,
      {
        headers: {
          Authorization: "Bearer " + token,

        },
      })
      .then(response => {
        history.push('/movies')
      }).catch(error => {
      console.log(error)
    });
  }
};



export const saveMovies = (movies) => {
  return {
    type: actionTypes.SAVE_MOVIES,
    movies: movies,
  };
};

export const saveMovieToEdit = (movie) => {
  return {
    type: actionTypes.SAVE_MOVIE_TO_EDIT,
    movie: movie,
  };
};

export const fetchMovies = (token) => {
  return (dispatch) => {
    moviesApi.get(
      "/api/movies?populate=*",
      {headers: {Authorization: "Bearer " + token}}
    )
      .then(response => {
        dispatch(saveMovies(response.data.data))
      })
  }
};

export const deleteMovie = (id, token, history) => {
  return (dispatch) => {
    moviesApi.delete(
      "/api/movies/" + id,
      {headers: {Authorization: "Bearer " + token}}
    )
      .then(response => {
        history.push("/movies")
      })
  }
};

export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};