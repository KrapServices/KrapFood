import React from 'react';
import './jquery-loader';
import './App.css';
import { Loader } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/views/home/Home';
import Login from './components/views/Login/Login';
import userContext from './userContext';
import config from './config.json';
import RiderSignup from './components/views/Login/RiderSignup';
import CustomerSignup from './components/views/Login/CustomerSignup';
import ManagerSignup from './components/views/Login/ManagerSignup';
import StaffSignup from './components/views/Login/StaffSignup';
import Signup from './components/views/Login/Signup';

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
        console.log(result.data.user);
        window.localStorage.setItem('user', JSON.stringify(result.data.user));
        this.setState({ user: result.data.user, isLoggedIn: true });
      }
    };

    this.handleDelete = async () => {
      const { user } = this.state;
      console.log(user);
      let route;
      switch (user.type) {
        case 'customer':
          route = `${config.localhost}customers/${user.customerId}`;
          break;
        case 'rider':
          route = `${config.localhost}riders/${user.rider_id}`;
          break;
        case 'staff':
          route = `${config.localhost}staffs/${user.staff_id}`;
          break;
        case 'manager':
          route = `${config.localhost}managers/${user.manager_id}`;
          break;
        default:
          alert('Unsupported user type');
          return;
      }
      try {
        await Axios.delete(route);
        this.logout();
      } catch (error) {
        alert('Error occurred.');
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
      handleDelete: this.handleDelete,
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
              <Home />
            )}
          />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/sign-up" render={() => <Signup />} />
          <Route exact path="/customer-signup" render={() => <CustomerSignup />} />
          <Route exact path="/rider-signup" render={() => <RiderSignup />} />
          <Route exact path="/manager-signup" render={() => <ManagerSignup />} />
          <Route exact path="/staff-signup" render={() => <StaffSignup />} />
        </Switch>
      </userContext.Provider>
    );
  }
}

export default App;
