import React, {Component} from 'react';

import {connect} from "react-redux";

import classes from "./CreateNewMovieScreen.module.css";
import {createMovie} from "../../store/actions/actions";
import MovieForm from "../../components/MovieForm/MovieForm";


class CreateNewMovieScreen extends Component {

  onCancel = () => {
    this.props.history.push("/movies")
  };

  render() {
    return (
      <>
        <div className={classes.container}>
          <div className={classes.title}>
            <h1>Create a new movie</h1>
          </div>
          <MovieForm onCancel={this.onCancel} onSubmit={this.props.createMovie} history={this.props.history} token={this.props.token}/>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createMovie: (movie, history, token) => dispatch(createMovie(movie, history, token)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewMovieScreen);
