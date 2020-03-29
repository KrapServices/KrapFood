import React from 'react';
import './jquery-loader';
import './App.css';
import { Loader } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import TopBar from './components/layout/TopBar';
import Home from './components/views/home/Home';
import Login from './components/views/Login/Login';
import userContext from './userContext';
import config from './config.json';
import Rider_signup from './components/views/Login/Rider_signup';
import Customer_signup from './components/views/Login/Customer_signup';
import Manager_signup from './components/views/Login/Manager_signup';
import Staff_signup from './components/views/Login/Staff_signup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: false,
    };

    this.getLoggedInStatus = () => {
      // TODO
    };

    this.signup = () => {
      // TODO
    };

    this.logout = () => {
      this.setState({ user: {}, isLoggedIn: false });
      window.localStorage.clear();
    };

    this.login = async (email, password, type) => {
      const result = await Axios.post(
        `${config.localhost}registrations/${type}/login`,
        {
          email,
          password,
        },
        {
          headers: { 'Access-Control-Allow-Origin': true },
        },
      );
      if (result.status === 200) {
        window.localStorage.setItem('user', JSON.stringify(result.data.user));
        this.setState({ user: result.data.user, isLoggedIn: true });
      }
    };
  }

  componentDidMount() {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      this.setState({ user, isLoggedIn: true });
    }
  }

  render() {
    const { user } = this.state;
    const value = {
      ...this.state,
      logout: this.logout,
      user,
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
          <Route exact path="/customer-signup" render={() => <Customer_signup />} />
          <Route exact path="/rider-signup" render={() => <Rider_signup />} />
          <Route exact path="/manager-signup" render={() => <Manager_signup />} />
          <Route exact path="/staff-signup" render={() => <Staff_signup />} />
        </Switch>
      </userContext.Provider>
    );
  }
}

export default App;
