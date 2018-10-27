import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Box, Heading, Text, Image, Card, Button, Mask, IconButton } from 'gestalt';
import { calculatePrice, setCart, getCart } from '../utils/index';
import Strapi from 'strapi-sdk-javascript/build/main';
import { Link } from 'react-router-dom'
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);



class Foods extends React.Component {
    state = {
        foods: [],
        foodtype: '',
        cartItems: []
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
                _id
                name
                description
                image {
                  url
                }
                price
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
                foodtype: response.data.foodtype.name,
                cartItems: getCart()
            });
        } catch (err) {
            console.error(err);
        }
    }

    addToCart = food => {
        const alreadyInCart = this.state.cartItems.findIndex(item => item._id === food._id);

        if(alreadyInCart === -1){
            const updatedItems = this.state.cartItems.concat({
                ...food,
                quantity:1
            });
            this.setState({ cartItems: updatedItems }, () => setCart(updatedItems));
        } else {
            const updatedItems = [...this.state.cartItems];
            updatedItems[alreadyInCart].quantity += 1;
            this.setState({ cartItems: updatedItems }, () => setCart(updatedItems))
        }
    }
deleteItemFromCart = itemToDeleteId =>{
    const filteredItems = this.state.cartItems.filter(item => item._id !== itemToDeleteId);
    this.setState({ cartItems: filteredItems }, () => setCart(filteredItems));
}

    render() {
        const { foodtype, foods, cartItems } = this.state

        return (
            <Box marginTop={4} display="flex" justifyContent="center" alignItems="start" flexWrap="wrap-reverse">
                {/* Food Section */}
                <Box display="flex" direction="column" alignItems="center">
                    {/* Food Heading */}
                    <Box margin={2}>
                        <Heading color="orchid">{foodtype}</Heading>
                    </Box>
                    {/* Food */}
                    <Box dangerouslySetInlineStyle={{ __style: { backgroundColor: "#bdcdd9" } }} shape="rounded" display="flex" justifyContent="center" padding={4}>
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
                                            <Text>${food.price}</Text>
                                        </Box>


                                        <Text bold size="xl">
                                            <Button onClick={() => this.addToCart(food)} color="blue" text="Add To Cart" />
                                        </Text>
                                    </Box>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>


                {}
                <Box marginTop={2} marginLeft={8}>
                    <Mask shape="rounded" wash>
                        <Box display="flex" direction="column" padding={2}>
                            {/*heading */}
                            <Heading align="center" size="sm">Your Cart</Heading>
                            <Text color="grey" italic>
                                {cartItems.length} items selected
                            </Text>

                            {/*Cart items*/}
                                {cartItems.map(item =>(
                                    <Box key={item._id} display="flex" alignItems="center">
                                    <Text>
                                        {item.name} x {item.quantity} - ${(item.quantity * item.price)}

                                    </Text>
                                    <IconButton
                                    accessibilityLabel="Delete item"
                                    icon="cancel"
                                    size="sm"
                                    iconColor="red"
                                    onClick={() => this.deleteItemFromCart(item._id)}
                                    />
                                    </Box>

                                ))}

                            <Box alignSelf="end" display="flex" alignItems="center" justifyContent="center" direction="column">
                                    <Box margin={2}>
                                    {cartItems.length === 0 &&(
                                        <Text color="red">Please Select An Item</Text>
                                    )}
                                    </Box>
                                    <Text size="lg">Total: ${calculatePrice(cartItems)}</Text>
                                    <Text>
                                        <Link to="/checkout">Checkout</Link>
                                    </Text>

                            </Box>
                        </Box>

                    </Mask>
                </Box>
            </Box>

        )
    }
}

export default Foods;