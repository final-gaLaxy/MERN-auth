import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./form.css";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rememberMe: false,
            redirectTo: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props._login(this.state.username, this.state.password, this.state.rememberMe);
        this.setState({
            redirectTo: '/'
        })
    }

    render() {
        if (!!this.props.user) {
            return <Navigate to={{ pathname: '/' }} />
        } else if (this.state.redirectTo) {
            return <Navigate to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <form onSubmit={this.handleSubmit} className="form">
                    <h1>Login</h1>
                    <div id="details">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <input onClick={this.handleSubmit} type="submit" value="Signup" />
                    </div>
                    <div id="options">
                        <div className="container">
                            <div className="checkbox">
                                <input type="checkbox" name="rememberMe" id="remember" onChange={this.handleChange}/>
                                <label htmlFor="remember">Remember Me</label>
                            </div>
                        </div>
                        <div className="container">
                            <a href="/">Forgot Password?</a>
                        </div>
                    </div>
                    <div id="create">
                        <p>Already have an account?</p>
                        <a href="/signup" id="switchForm">Create an account now!</a>
                    </div>
                </form>
            )
        }
    }
}

export default LoginForm