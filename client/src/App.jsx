import React, { Component } from 'react';
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';

import Loading from './components/Loading';

const SignupForm = React.lazy(() => import('./components/SignupForm'));
const LoginForm = React.lazy(() => import('./components/LoginForm'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loggedIn: false,
      user: null
    }
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    axios.get('/api/user')
    .then(res => {
      if (!!res.data.user) {
        this.setState({
          loggedIn: true,
          user: res.data.user
        });
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
      this.setState({
        loading: false
      });
    });
  }

  _logout() {
    axios
      .post('/api/logout')
      .then(response => {
        if (response.status === 200) {
          this.setState({
            loggedIn: false,
            user: null
          });
        }
      });
  }

  _login(username, password, rememberMe) {
    axios
      .post('/api/login', {
        username: username,
        password: password,
        remember: rememberMe
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        }
      });
  }

  render() {
    return (
      <div className="App">
          {this.state.loading ? (<Loading />) : (
            <Routes>
              <Route
                exact
                path="/"
                element={<Dashboard user={this.state.user} _logout={this._logout} />}
              />
              <Route
                exact
                path="/signup"
                element={<SignupForm user={this.state.user}/>}
              />
              <Route
                exact
                path="/login"
                element={<LoginForm user={this.state.user} _login={this._login}/>}
              />
            </Routes>
          )}
      </div>
    );
  }
}


export default App;
