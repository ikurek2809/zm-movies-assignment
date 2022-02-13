import React, {Component} from 'react';

import classes from "./MovieForm.module.css";
import drop from "../../images/drop.svg"
import Dropzone from "react-dropzone";
import Button from "../../components/Button/Button";
import Input from "../Input/Input";


class MovieForm extends Component {

  state = {
    movieName: {
      value: this.props.movie ? this.props.movie.attributes.name : "",
      showError: false
    },
    publishingYear: {
      value: this.props.movie ? this.props.movie.attributes.publicationYear : "",
      showError: false
    },
    image: {
      value: "",
      showError: false
    },
    id: this.props.movie ? this.props.movie.id : "",
    fileURL: this.props.movie && this.props.movie.attributes.poster.data ? this.props.movie.attributes.poster.data.attributes.url : "",
    file: {}
  };


  onInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: {
        value: e.target.value,
        showError: false
      }
    })
  };

  onSubmitButtonClick = (e) => {
    e.preventDefault();
    let wasError = false;
    const newState = {...this.state};
    if (this.state.movieName.value === "") {
      newState.movieName.showError = true;
      wasError = true;

    }
    if (this.state.publishingYear.value === "") {
      newState.publishingYear.showError = true;
      wasError = true;
    }
    if (wasError) {
      this.setState(newState);
      return
    }
    this.props.onSubmit({id: this.state.id, movieName: this.state.movieName.value, publishingYear: this.state.publishingYear.value, file: this.state.file}, this.props.history, this.props.token);
  };

  onCancelButtonClick = () => {
    this.props.onCancel();
  };

  onDrop = (files) => {
    this.setState({
      ...this.state,
      fileURL: URL.createObjectURL(files[0]),
      file: files[0]
    })
  };

  render() {
    return (
      <div className={classes.createMovieForm}>
        <div className={classes.dropImageAreaContainer}>
          <Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps}) => (
              <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} />
                  <div className={classes.dropImageArea}>
                    {this.state.fileURL
                      ? <img className={classes.previewImage} src={this.state.fileURL} alt=""/>
                      :
                      <>
                        <img src={drop} alt=""/>
                        <p>Drop an image here</p>
                      </>
                    }
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className={classes.createMovieFormInputAreaContainer}>
          <div className={classes.titleInputArea}>
            <Input onChange={this.onInputChange} value={this.state.movieName.value} showError={this.state.movieName.showError} errorMessage="Field is required!" name="movieName" type="text"
                   placeholder="Title"/>
          </div>
          <div className={classes.publishingYearInputArea}>
            <Input onChange={this.onInputChange} value={this.state.publishingYear.value} showError={this.state.publishingYear.showError} errorMessage="Field is required!" name="publishingYear"
                   type="text"
                   placeholder="Publishing Year"/>
          </div>
          <div className={classes.buttonArea}>
            <div className={classes.cancelButtonContainer}>
              <Button onClick={this.onCancelButtonClick} variant="secondary" text="Cancel"/>
            </div>
            <div className={classes.submitButtonContainer}>
              <Button onClick={this.onSubmitButtonClick} variant="primary" text="Submit"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (MovieForm);
