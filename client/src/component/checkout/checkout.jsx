import React, { Component } from 'react';
import { Container, Box, Button, Heading, Text, TextField, Modal, Spinner } from 'gestalt';
import { Elements , StripeProvider, CardElement, injectStripe} from 'react-stripe-elements'


import { getCart, calculatePrice } from '../utils/index';
export default class Checkout extends Component {
    state = {
        cartItems: [],
        address: "",
        postalCode: "",
        city: "",
        confirmationEmailAddress: "",
        orderProcessing: true,
        modal: false
    };
    componentDidMount() {
        this.setState({ cartItems: getCart() });
    }


    handleChange = ({ event, value }) => {
        event.persist();
        this.setState({ [event.target.name]: value });
    }

    handleConfirmOrder = async event => {
        event.preventDefault();

        if (!this.isFormEmpty(this.state)) {
            console.log('submitted')
        }

        this.setState({ modal: true })
    };

    handleSubmitOrder = () => {}

    isFormEmpty = ({ address, postalCode, city, confirmationEmailAddress }) => {
        return !address || !postalCode || !city || !confirmationEmailAddress;
    };

    closeModal = () => this.setState({ modal: false });
    render() {
        const { cartItems, modal, orderProcessing  } = this.state;


        return (
            <Container>
                <Box
                    color="darkWash"
                    margin={4}
                    padding={4}
                    shape="rounded"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                >

                    <Heading color="midnight">Checkout</Heading>
                    {cartItems.length > 0 ? <React.Fragment>
                        {/*item Cart*/}
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            direction="colmn"
                            marginTop={2}
                            marginBottom={6}
                        >

                            <Text color="darkGray" italic>{cartItems.length} Items for Checkout</Text>
                            <Box padding={2}>
                                {cartItems.map(item => (
                                    <Box key={item._id} padding={1}>
                                        <Text color="midnight">
                                            {item.name} x {item.quantity} - {item.quantity * item.smallPirce}
                                        </Text>


                                    </Box>
                                ))}
                            </Box>
                            <Text bold> Total Amount: {calculatePrice(cartItems)}</Text>

                        </Box>
                        {/*checkout form*/}

                        <form style={{
                            display: 'inlineBlock',
                            textAlign: 'center',
                            maxWidth: 450
                        }}
                            onSubmit={this.handleConfirmOrder}
                        >
                            { /*checkout form*/}


                            {}
                            <TextField
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Address"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="postalCode"
                                type="number"
                                name="postalCode"
                                placeholder="Postal Code"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="city"
                                type="text"
                                name="city"
                                placeholder="City of residence"
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="confirmationEmailAddress"
                                type="email"
                                name="confirmationEmailAddress"
                                placeholder="Confirmation email address"
                                onChange={this.handleChange}
                            />
                            {   }
                  
                            <button id="stripe__button" type="submit" >Submit</button>
                        </form>

                    </React.Fragment> :(
                        <Box color="darkWash" shape="rounded" padding={4}>
                            <Heading align="center" color="watermelon" size="xs">Your Cart Is Empty</Heading>
                            <Text align="center" italic color="green"> Add some food! </Text>
                        </Box>
                    )}
                </Box>
                {/*confirmation Modal*/}
                {modal && (
                    <ConfirmationModal orderProcessing={orderProcessing} cartItems={cartItems} closeModal=
                    {this.closeModal} handleSubmitOrder={this.handleSubmitOrder}/>
                )}

            </Container>
        );
    };
};

const ConfirmationModal = ({ orderProcessing, cartItems, closeModal, handleSubmitOrder }) => (
    <Modal
    accessibilityCloseLabel="close"
    accessibilityModalLabel="Confirm Your Order"
    heading="Confirm Your Order"
    onDismiss={closeModal}
    footer={
        <Box display="flex" marginRight={-1} marginLeft={-1} justifyContent="center">
            <Box padding={1}>
                <Button
                size="lg"
                color="red"
                text="Submit"
                disabled={orderProcessing}
                onClick={handleSubmitOrder}
                >

                </Button>
            </Box>
            <Box padding={1}>
                <Button
                size="lg"
                text="Cancel"
                disabled={orderProcessing}
                onClick={closeModal}
                >

                </Button>
            </Box>
        </Box>
    }
    role="alertdialog"
    size="sm"
    >

    {/* Order summary */} 
    {!orderProcessing && (
        <Box display="flex" justifyContent="center" alignItems="center" direction="column" padding={2}
        color="lightWash">
        {cartItems.map(item =>(
            <Box key={item._id} padding={1}>
                <Text size="lg" color="red">
                {item.name} x {item.quantity * item.price}
                </Text>
            </Box>
        ))}
        <Box paddingY={2}>
            <Text size="lg" bold>
            Total: {calculatePrice(cartItems)}
            </Text>

        </Box>
        </Box>
    )}
            <Spinner show={orderProcessing} accessibilityLabel="Order Processing Spinner"/>
            {orderProcessing && <Text align="center" italic>Submitting Order...</Text>}
    </Modal>
)


