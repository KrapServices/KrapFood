import React from "react";
import logo from "./logo.svg";
import "./jquery-loader";
import "./App.css";
import { Container, Header } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import TopBar from "./layout/TopBar";
import Home from "./pages/Home";
import Login from './pages/Login/Login';
import Signup from "./pages/Login/Signup";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={props => <TopBar>
        <Home></Home>
      </TopBar>} />
      <Route exact path="/login" render={props => <Login></Login>} />
      <Route exact path="/sign-up" render={props => <Signup></Signup>} />



    </Switch>
  );
}

export default App;
