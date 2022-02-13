import React, {Component} from 'react';

import {connect} from "react-redux";

import classes from "./EditMovieScreen.module.css";
import {deleteMovie, updateMovie} from "../../store/actions/actions";
import MovieForm from "../../components/MovieForm/MovieForm";
import Button from "../../components/Button/Button";


class EditMovieScreen extends Component {

  onCancelButtonClick = () => {
    this.props.history.push("/movies")
  };

  onDeleteButtonClick = (id) => {
    this.props.deleteMovie(id, this.props.token, this.props.history);

  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <h1>Edit</h1>
          <div className={classes.deleteButton}>
            <Button onClick={() => this.onDeleteButtonClick(this.props.movie.id)} variant="primary" text="Delete"/>
          </div>
        </div>
        <MovieForm onCancel={this.onCancelButtonClick} onSubmit={this.props.updateMovie} history={this.props.history} movie={this.props.movie} token={this.props.token}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    movie: state.movieToEdit
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateMovie: (movie, history, token) => dispatch(updateMovie(movie, history, token)),
    deleteMovie: (id, token, history) => dispatch(deleteMovie(id, token, history)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMovieScreen);
