import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch,Route} from "react-router";
import Employee from "./components/Employee";
import Admin from "./components/Admin";
import Login from "./components/Login";
import firebase from "./firebase";
class App extends React.Component{
  render()
  {
    return(
      <div>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path="/employee" component={Employee}/>
          <Route exact path="/dashboard" component={Admin}/>
        </Switch>
      </div>
    )
  }
}

export default App;
