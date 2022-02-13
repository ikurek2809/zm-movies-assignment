import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginScreen from "./containers/LoginScreen/LoginScreen";
import MoviesScreen from "./containers/MoviesScreen/MoviesScreen";
import classes from "./App.module.css";
import CreateNewMovieScreen from "./containers/CreateNewMovieScreen/CreateNewMovieScreen";
import EditMovieScreen from "./containers/EditMovieScreen/EditMovieScreen";
import "./global.css"

function App() {
  return (
    <div className={classes.container}>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginScreen}/>
          <Route exact path="/movies" component={MoviesScreen}/>
          <Route exact path="/createMovie" component={CreateNewMovieScreen}/>
          <Route exact path="/editMovie" component={EditMovieScreen}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;