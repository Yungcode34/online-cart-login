import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Card, CardBody } from 'reactstrap';
import './home.css';
import bgImg from '../../assets/abundance-agriculture-bananas-264537.jpg'



export default class Home extends Component {
    constructor() {
        super()
    }
    onChange = (e) => {
        this.props.history.push(`/${e.target.value}`);
      }    
    
    render() {
        return (
            <Grid>
                <img src={bgImg} alt="bg" class="bg"></img>
                <Jumbotron>
                    <div id="main-content">
                        <h1 className="jumbo-title">Unidos Supermarket Catering</h1>
                        <p>
                            <em>Fast, easy and delicious - spend less time in the kitchen!</em>
                        </p>
                        <p>
                            Order all your catering needs and party must-haves online and then pick them up in store.
                            <strong>&nbsp;Please start by selection your store.</strong> 
                        </p>
                    </div>
                <FormGroup controlId="formControlsSelect">
                            <FormControl componentClass="select" onChange={this.onChange} placeholder="select">
                                <option>Select catering location...</option>
                                <option value="kissimmee">Kissimmee | 1200 Simpson Rd Kissimmee, Florida</option>
                                <option value="poinciana">Poinciana | 2433 Pleasant Hill Rd Kissimmee, Florida</option>
                                <option value="deltona">Deltona | 1870 Providence Blvd Deltona, Florida</option>
                            </FormControl> 
                        </FormGroup>
                    
                </Jumbotron>
            </Grid>
        );
    };
};