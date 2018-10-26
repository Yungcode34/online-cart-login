import React, { Component } from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';
import Strapi from 'strapi-sdk-javascript/build/main';
import { setToken } from '../../index';
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export default class SignUp extends Component {
    state = {
        username:``,
        email:'',
        password:'',
        loading: false
    }
    handleChange = ({ event, value }) => {
        event.persist();
        this.setState({ [event.target.name]: value });
    }

 handleSubmit = async event => {
     event.preventDefault();
const { username, email, password } = this.state;

     if(!this.isFormEmpty(this.state)) {
        console.log('submitted')
     }


     try{
         this.setState({ loading: true });
         const response = await strapi.register(username, email, password);
         this.setState({ loading: false});
         setToken(response.jwt);
         
         this.redirectUser('/')
         //set loading - true 
         //make request to register user with strappi
         //set loading false
         //put token (to manage user session) in local storage
         //redirect user to home page
     } catch (err) {
        this.setState({ loading: false});
    //set loading - false
    //show error message with toast message
     }
 };

 redirectUser = path => this.props.history.push(path);

 isFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;
 };



    render() {
        const{ loading } = this.state

        return(
          <Container>
              <Box
              dangerouslySetInLineStyle={{
                  __style: {
                      backgroundColor: '#ebezda'
                  }
              }}
              margin={4}
              padding={4}
              shape="rounded"
              display="flex"
              justifyContent="center"
              >
                {   }

                <form style={{
                    display: 'inlineBlock',
                    textAlign: 'center',
                    maxWidth: 450 
                  }}
                  onSubmit={this.handleSubmit}
                  >
                  {    }
                  <Box 
                  marginBottom={2}
                  display="flex"
                  direction="colum"
                  alignItems="center"
                  >

                <Heading color="midnight">Lets Get Started</Heading>
                <Text color="orchid">Sign Up To Order Some Food</Text>
                  </Box>
                    {    }
                    <TextField
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    />
                      <TextField
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                    /> 
                      <TextField
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    />
                    <Button
                    inline
                    disabled={loading}
                    color="blue"
                    text="Submit"
                    type="submit"
                    />
                </form>
              </Box>
              
          </Container>
        );      
    };
};