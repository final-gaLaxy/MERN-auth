import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./form.css";

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
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
        axios
            .post("/api/signup", {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log(response.data)
                if (response.status === 201) {
                    this.setState({
                        redirectTo: '/login'
                    });
                }
            });
    }

    render() {
        if (!!this.props.user) {
            return <Navigate to={{ pathname: '/' }} />
        } else if (this.state.redirectTo) {
            return <Navigate to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <form onSubmit={this.handleSubmit} className="form">
                    <h1>Signup</h1>
                    <div id="details">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
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
                        {/* <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            required
                        /> */}
                        <input onClick={this.handleSubmit} type="submit" value="Signup" />
                    </div>
                    <div id="create">
                        <p>Already have an account?</p>
                        <a href="/login" id="switchForm">Login Now!</a>
                    </div>
                </form>
            );
        }
    }
}

export default SignupForm