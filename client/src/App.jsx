import React, { Component } from 'react';
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';

const SignupForm = React.lazy(() => import('./components/SignupForm'));
const LoginForm = React.lazy(() => import('./components/LoginForm'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: null
    }
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    axios.get('/auth/user')
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
      });
  }

  _logout() {
    axios
      .post('/auth/logout')
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
      .post('/auth/login', {
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
        <Routes>
          <Route
            exact
            path="/"
            element={<Dashboard user={this.state.user} _logout={this._logout}/>}
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
      </div>
    );
  }
}

export default App;
