import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Heading, Card, Image, Text} from 'gestalt';
import Strapi from 'strapi-sdk-javascript/build/main';
import './catering.css'

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
           console.log(response);
         } catch (err) {
           console.error(err);
         }
       
       }
    render() {
        const { foodtypes } = this.state;
        return(
        <Container>
          <div className="container">
                <h2>Kissimmee Catering</h2> <Link to="/">Change location</Link>
          </div>
            <Box displays="flex" justifyContent="center" marginBottom={2}>
          {/*Food Header*/}
                <Heading color="midnight" size="md">
                    Food Categories
                 </Heading>
            </Box>
            <Box wrap display="flex" justifyContent="around">
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
          </Container>
        );      
    };
};