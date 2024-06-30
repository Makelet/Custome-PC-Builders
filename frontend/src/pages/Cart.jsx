import React, { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../Context/Context';
import { deleteItems, getItems, updateQty } from '../Store/Slices/CartSlice';

function CartPage() {
    let { user } = useAuth();
    let dispatch = useDispatch();
    let cart = useSelector(state => state.cart.cart);//this is cart object which comes from database
    let userCartItems = cart.cart; //in cart object we have cart[] array which have all the details off cart items
    let toast = useToast();
    console.log(userCartItems);
    let subtotal = userCartItems?.map(item => item.totalPrice).reduce((acc, item) => acc += item);//getting all the totalPrice of all carts

    useEffect(() => {
        dispatch(getItems());
    }, [])


    const handleDelteItem = (pId) => {
        dispatch(deleteItems(pId));
        toast({
            title: 'Item Deleted.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }


    const handleDecrement = (pId, qty) => {
        if (qty > 1) {
            dispatch(updateQty(pId, qty - 1))
        }
    }
    const handleIncrement = (pId, qty) => {
        dispatch(updateQty(pId, qty + 1))
    }


    return (
        <Box p={50}>
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between">
                {/* <Box w={{ base: '100%', md: '60%' }} mb={{ base: 5, md: 0 }}>
                    <Flex gap="30px" align="center" p={4} borderWidth={1} borderRadius="md">
                        <Box flex="1" ml={4}>
                            <Text fontWeight="bold">PRODUCT</Text>
                        </Box>
                        <Box>
                            <Text>price</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" color="red.500">totalPrice</Text>
                        </Box>
                    </Flex>
                </Box> */}
                <Box w={{ base: '100%', md: '60%' }} mb={{ base: 5, md: 0 }}>
                    {userCartItems?.map((item) => (
                        <Flex key={item._id} gap="30px" align="center" p={4} borderWidth={1} borderRadius="md">
                            <MdCancel fontSize={22} color='#ff0000' cursor={"pointer"} onClick={() => handleDelteItem(item._id)} />
                            <Image src={item.image} alt="MSI RTX 4070 Super Gaming X Slim 12GB" boxSize="100px" />
                            <Box flex="1" ml={4}>
                                <Text fontWeight="bold">{item.title}</Text>
                            </Box>
                            <Box>
                                <Text>₹{item.price}</Text>
                            </Box>
                            <HStack spacing={0}>
                                <Button
                                    // colorScheme="red"
                                    bg={"#ff0000"}
                                    color={"white"}
                                    borderRightRadius={0}
                                    onClick={() => handleDecrement(item._id, item.qty)}
                                    _hover={{ bg: "white", color: "black" }}
                                    border=".5px solid #d6d6d68c"

                                >
                                    -
                                </Button>
                                <Box
                                    borderWidth="1px"
                                    borderColor="gray.200"
                                    px={4}
                                    py={2}
                                    display="flex"
                                    alignItems="center"
                                    border=".5px solid #d6d6d68c"
                                >
                                    <Text>{item.qty}</Text>
                                </Box>
                                <Button
                                    bg={"#ff0000"}
                                    color={"white"}
                                    borderLeftRadius={0}
                                    onClick={() => handleIncrement(item._id, item.qty)}
                                    _hover={{ bg: "white", color: "black" }}
                                    border=".5px solid #d6d6d68c"
                                >
                                    +
                                </Button>
                            </HStack>
                            <Box>
                                <Text fontWeight="bold" color="red.500">₹{item.totalPrice}</Text>
                            </Box>
                        </Flex>

                    ))
                    }
                </Box>
                <Box w={{ base: '100%', md: '35%' }} p={4} borderWidth={1} borderRadius="md">
                    <Text fontWeight="bold">Cart Totals</Text>
                    <Flex justify="space-between" mt={4}>
                        <Text>Subtotal</Text>
                        <Text>₹{subtotal}</Text>
                    </Flex>
                    <RadioGroup defaultValue="1" mt={4}>
                        <Stack direction="column">
                            <Radio value="1">Home Delivery</Radio>
                            <Radio value="2">Offline Store Pickup</Radio>
                        </Stack>
                    </RadioGroup>
                    <Flex alignItems={"center"} justify="space-between" mt={4}>
                        <Text fontSize={30} fontFamily={"sans-serif"} fontWeight={"Bolder"}>Total</Text>
                        <Text fontSize={24} fontFamily={"sans-serif"} fontWeight="bold" color="red.500">₹{subtotal}</Text>
                    </Flex>
                    <Button bg="#ff0000" color={"white"} w="full" mt={4}>Proceed To Checkout</Button>
                </Box>
            </Flex >
        </Box >
    );
}

export default CartPage;