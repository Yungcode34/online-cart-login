import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Box, Text, Heading, Image, Button } from "gestalt";
import { Link, withRouter } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import './customNav.css'
import axios from 'axios'
import { getToken, clearToken } from '../../index';

class customNav extends React.Component {
    handleSignout = () => {
        //clear token
    clearToken();
this.props.history.push('/')
        //clear cart
        //redirect home
    }
    render(){
        return getToken() !== null ?
        <AuthNav handleSignout={this.handleSignout} /> : <UnAuthNav />;
    }
}

const AuthNav = ({handleSignout}) =>(

    <Navbar>

           <Navbar.Collapse>
    <Nav pullRight>

        <NavItem eventKey={3} componentClass={Link} href="/checkout" to="/checkout">
            Checkout
    </NavItem>
    
    <Button
    onClick={handleSignout}
    color="grey"
    text="Sign Out"
    inline
    size="md"
   />


    </Nav>
</Navbar.Collapse>

    </Navbar>
)
const UnAuthNav = () =>(

<Navbar>

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
</Navbar>
)




export default withRouter(customNav);