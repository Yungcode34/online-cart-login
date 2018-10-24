import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DeltonaCatering extends Component {
    render() {
        return(
          <div className="container">
                <h2>Deltona Catering</h2> <Link to="/">Change location</Link>
          </div>
        );      
    };
};