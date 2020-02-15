import React from 'react';
import './jquery-loader';
import './App.css';
import { Loader } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Home from './components/views/home/Home';
import Login from './components/views/Login/Login';
import Signup from './components/views/Login/Signup';
import userContext from './userContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

    this.getLoggedInStatus = () => {
      // TODO
    };

    this.signup = () => {
      // TODO
    };

    this.login = () => {
      // TODO
    };

    this.logout = () => {
      console.log('DAAHSKASHKDASHLADHS');
      this.setState({ user: {} });
    };
  }

  render() {
    const value = {
      ...this.state,
      logout: this.logout,
      signup: this.signup,
      login: this.login,
    };

    const { loading } = this.state;

    return (
      <userContext.Provider value={value}>
        {loading ? <Loader /> : <span />}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <TopBar>
                <Home />
              </TopBar>
            )}
          />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/sign-up" render={() => <Signup />} />
        </Switch>
      </userContext.Provider>
    );
  }
}

export default App;
