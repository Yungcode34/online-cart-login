import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './component/home/home';
import Catering from './component/catering/catering';
import DeltonaCatering from './component/catering/deltona-cater';
import PoincianaCatering from './component/catering/poinciana-cater';
import Checkout from './component/checkout/checkout';
import Login from './component/login/login';
import SignUp from './component/signup/signup';
import SignIn from './component/signin/signin';

import Navbar from './component/customNav/customNav';
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);
class App extends Component {

  


  render() {
    return (
      <Router>
        <div>
          
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/kissimmee" component={Catering} />
          <Route path="/login" component={Login} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/deltona" component={DeltonaCatering} />
          <Route path="/poinciana" component={PoincianaCatering} />
          <Route path="/checkout" component={Checkout} />
        </div>
      </Router>
    );
  }
};


export default App;
