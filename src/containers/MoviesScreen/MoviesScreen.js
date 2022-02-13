import React, {Component} from 'react';

import {connect} from "react-redux";

import classes from "./MoviesScreen.module.css";
import plus from "../../images/plus.svg"
import logout from "../../images/logout.svg"
import {fetchMovies, logoutUser, saveMovieToEdit} from "../../store/actions/actions";
import Button from "../../components/Button/Button";
import MovieCard from "../../components/MovieCard/MovieCard";

class MoviesScreen extends Component {

  async componentDidMount() {
    this.props.fetchMovies(this.props.token);
  }

  onEditButtonClick = (movie) => {
    this.props.history.push("/editMovie");
    this.props.saveMovieToEdit(movie);
  };

  onAddNewMovieButtonClick = () => {
    this.props.history.push("/createMovie")
  };

  onLogOutButtonClick = () => {
    this.props.logoutUser();
    this.props.history.push("/")
  };

  render() {
    if(!this.props.token){
      this.props.history.push("/")
    }
    return (
      <>
        {this.props.movies.length === 0
          ?
          <div className={classes.container}>
            <h1>Your movie list is empty</h1>
            <div className={classes.addNewMovieButtonContainer}>
              <Button onClick={this.onAddNewMovieButtonClick} variant="primary" text="Add a new Movie" />
            </div>
          </div>
          :
          <div className={classes.body}>
            <div className={classes.header}>
              <div className={classes.left}>
                <h1>My movies</h1>
                <img className={classes.icon} onClick={() => this.props.history.push("/createMovie")} src={plus} alt="plus"/>
              </div>
              <div onClick={this.onLogOutButtonClick} className={classes.right}>
                <p>Logout</p>
                <img  className={classes.icon} src={logout} alt="logout"/>
              </div>
            </div>
            <div className={classes.movieListContainer}>
              {this.props.movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onEditButtonClick={this.onEditButtonClick} onDeleteButtonClick={this.onDeleteButtonClick} />
              ))}
            </div>
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    movies: state.movies
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: (token) => dispatch(fetchMovies(token)),
    saveMovieToEdit: (movie) => dispatch(saveMovieToEdit(movie)),
    logoutUser: () => dispatch(logoutUser()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesScreen);
