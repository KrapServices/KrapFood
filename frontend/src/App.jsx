import React from "react";
import logo from "./logo.svg";
import "./jquery-loader";
import "./App.css";
import { Container, Header, Loader } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import TopBar from "./components/layout/TopBar";
import Home from "./components/views/home/Home";
import Login from './components/views/Login/Login';
import Signup from "./components/views/Login/Signup";
import {userContext} from './userContext';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    user: {}
  };
}

  getLoggedInStatus = () => {

  }
 
  signup = () => {

  }

  login = () => {

  }


  logout = () => {
    console.log("DAAHSKASHKDASHLADHS");
    this.setState({user:{}});
  }

  render() {
    const value = {
      user: this.state.user,
      logout: this.logout,
      signup: this.signup,
      login: this.login,
    }

    return (
      <userContext.Provider value={value}>
         {this.state.loading ? <Loader></Loader> : <span></span>}
           <Switch>
        <Route exact path="/" render={props => <TopBar>
          <Home ></Home>
        </TopBar>} />
        <Route exact path="/login" render={props => <Login></Login>} />
        <Route exact path="/sign-up" render={props => <Signup></Signup>} />
      </Switch>
      </userContext.Provider>
   
    );
  }
}





export default App;
