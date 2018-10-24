import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import './customNav.css'
import axios from 'axios'

export default class CustomNav extends Component {

    
    render() {

        return (
            <Navbar style={{height: '65px'}} default collapseOnSelect>
            <section>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                            Home
                    </NavItem>
                        
                        <NavItem eventKey={3} componentClass={Link} href="/checkout" to="/checkout">
                            Checkout
                    </NavItem>
        
                    <NavItem eventKey={3} componentClass={Link} href="/signin" to="/signin">
                            Sign In
                    </NavItem>

                    <NavItem eventKey={3} componentClass={Link} href="/signup" to="/signup">
                            Sign Up
                    </NavItem>

                    </Nav>
                </Navbar.Collapse>
                </section>
                
            </Navbar>
        );


        };
    }