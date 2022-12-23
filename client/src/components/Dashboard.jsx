import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./user.css";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props._logout();
        this.setState({
            redirectTo: '/login'
        });
    }

    render() {
        if (!this.props.user) {
            return <Navigate to={{ pathname: '/login' }} />
        } else if (this.state.redirectTo) {
            return <Navigate to={{ pathname: this.state.redirectTo }}/>
        } else {
            return (
                <div className="dash">
                    <p>Welcome {this.props.user.username}</p>
                    <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Sign Out" />
                    </form>
                </div>
            )
        }
    }
}

export default Dashboard;