import React, {Component} from 'react';

import {connect} from "react-redux";

import classes from "./LoginScreen.module.css";
import {loginUser} from "../../store/actions/actions";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";


class LoginScreen extends Component {

  state = {
    email: {
      value: "",
      showError: false
    },
    password: {
      value: "",
      showError: false
    }
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

  onLoginButtonClick = (e) => {
    e.preventDefault();

    const newState = {...this.state};
    let wasError = false;
    if (this.state.email.value === "") {
      newState.email.showError = true;
      wasError = true;
    }
    if (this.state.password.value === "") {
      newState.password.showError = true;
      wasError = true;
    }
    if (wasError) {
      this.setState(newState);
      return
    }
    this.props.loginUser(this.state.email.value, this.state.password.value, this.props.history);
  };

  render() {
    return (
      <div className={classes.container}>
        <h1>Sign in</h1>
        <form className={classes.form}>
          <div className={classes.formControl}>
            <Input onChange={this.onInputChange} value={this.state.email.value} showError={this.state.email.showError} errorMessage="Field is required!" name="email" type="text"
                   placeholder="Email"/>
          </div>
          <div className={classes.formControl}>
            <Input onChange={this.onInputChange} value={this.state.password.value} showError={this.state.password.showError} errorMessage="Field is required!" name="password" type="password"
                   placeholder="Password"/>
          </div>
          {this.props.loginError.message && <p className={classes.errorMessage}>{this.props.loginError.message}</p>}
          <p className={classes.checkboxText}><input type="checkbox"/> Remember me</p>
          <Button text="Login" onClick={this.onLoginButtonClick} variant="primary"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.loginError
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (username, password, history) => dispatch(loginUser(username, password, history)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
