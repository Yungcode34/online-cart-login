import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import './logo.css'

export default class Logo extends Component {
    render() {
        return (
            <div className="container">
                <Image style={{ height: '100px', width: '100px' }} src={logo} circle />
            </div>
        );
    };
};