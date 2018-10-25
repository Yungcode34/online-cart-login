import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Col } from 'react-bootstrap'
import { Container, Box, Heading, Card, Image, Text} from 'gestalt';
import './catering.css'

import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export default class Catering extends Component {
    state = {
       foodtypes: []
     };
    async componentDidMount(){

         try {
           const response = await strapi.request('POST', '/graphql', {
             data: {
               query: `query {
                 foodtypes {
                   _id
                   name
                   description
                   image {
                     url
                   }
                 }
               }
               `
             }
           });
           this.setState({ foodtypes: response.data.foodtypes });
          //  console.log(response);
         } catch (err) {
           console.error(err);
         }
       
       }
    render() {
        const { foodtypes } = this.state;
        return(
          <Grid>
            <Col md={3}>
              <Box  padding={5} dangerouslySetInlineStyle={{ __style: {backgroundColor: "white", textAlign: "center"}}} marginBottom={5}>
              <p style={{marginBottom: 0}}>Your store:</p><strong><h3 style={{marginTop: 5, marginBottom:  5}} >Deltona</h3></strong> <p>870 Providence Blvd Deltona, Florida, 32725</p><Link to="/">Change location</Link>
              </Box>
            </Col>
      
              <Box dangerouslySetInlineStyle={{ __style: {textAlign: "center"}}} displays="flex" justifyContent="center" marginBottom={2}>
            {/*Food Header*/}
                  <Heading color="midnight" size="md">
                      Food Categories
                  </Heading>
              </Box>
              <Box padding={4} dangerouslySetInlineStyle={{ __style: {backgroundColor: "white"}}} shape="rounded" wrap display="flex" justifyContent="around">
                  {foodtypes.map(foodtype => (
                    <Box margin={2} width={200} key={foodtype._id}>
                          <Card image={
                                  <Box height={200} width={200}>
                                      <Image
                                      alt="Foodtype"
                                      naturalHeight={1}
                                      naturalWidth={1}
                                      src={`${apiUrl}${foodtype.image.url}`}
                                      >
                                      </Image>
                                  </Box>
                              }>
                              <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                                  <Text bold size="xl">{foodtype.name}</Text>
                                  <Text>{foodtype.description}</Text>
                                  <Text bold size="xl">
                                      <Link to={`/${foodtype._id}`}>See Options</Link>
                                  </Text>
                              </Box>
                          </Card>
                      </Box>
                  ))}
              </Box>
            </Grid>
        );      
    };
};