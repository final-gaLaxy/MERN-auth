import React, { Component } from 'react';
import './loading.css'

class Loading extends Component {
    render() {
        return (
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default Loading;