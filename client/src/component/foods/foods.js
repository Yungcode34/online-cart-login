import React from 'react';
import { FormGroup, FormControl } from  'react-bootstrap';
import { Box, Heading, Text, Image, Card, Button } from 'gestalt'
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);



class Foods extends React.Component {
    state = {
        foods: [],
        foodtype: ''
    }

    async componentDidMount() {
        try {
            const response = await strapi.request('POST', '/graphql', {
                data: {
                    query: `query {
            foodtype(id: "${this.props.match.params.foodtypeId}") {
              _id
              name 
              foods {
                name
                description
                image {
                  url
                }
                smallprice
                mediumprice
                largeprice
                unitprice
                weightprice
              }
            }
          }`
                }
            });
            this.setState({
                foods: response.data.foodtype.foods,
                foodtype: response.data.foodtype.name
            })
        } catch (err) {
            console.error(err);
        }
    }


    render() {
        const { foodtype, foods } = this.state

        return (
            <Box marginTop={4} display="flex" justifyContent="center" alignItems="start">
                {/* Food Section */}
                <Box display="flex" direction="column" alignItems="center">
                    {/* Food Heading */}
                    <Box margin={2}>
                        <Heading color="orchid">{foodtype}</Heading>
                    </Box>
                    {/* Food */}
                    <Box dangerouslySetInlineStyle={{ __style: {backgroundColor: "#bdcdd9"}}} shape="rounded" display="flex" justifyContent="center" padding={4}>
                        {foods.map(food => (
                            <Box margin={2} width={210} key={food._id}>
                                <Card image={
                                    <Box height={250} width={200}>
                                        <Image
                                            alt="food"
                                            naturalHeight={1}
                                            naturalWidth={1}
                                            src={`${apiUrl}${food.image.url}`}
                                        >
                                        </Image>
                                    </Box>
                                }>
                                    <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                                        <Box marginBottom={2}>
                                            <Text bold size="xl">{food.name}</Text>
                                        </Box>
                                        <Box marginBottom={2}>
                                            <Text>{food.description}</Text>
                                        </Box>

                                        <FormGroup controlId="formControlsSelect">
                                            <FormControl componentClass="select" onChange={this.onChange} placeholder="select">
                                                <option>Select size</option>
                                                <option value="small">Small ${food.smallprice}</option>
                                                <option value="medium">Medium ${food.mediumprice}</option>
                                                <option value="large">Large ${food.largeprice}</option>
                                                <option value="unit">Unit ${food.unitprice}</option>
                                                <option value="weight">Weight ${food.weightprice}</option>
                                            </FormControl>
                                        </FormGroup>

                                       
                                        <Text bold size="xl">
                                            <Button color="blue" text="Add To Cart" />
                                        </Text>
                                    </Box>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

        )
    }
}

export default Foods;