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
import { FaTrashAlt } from 'react-icons/fa';

function CartPage() {
    let { user } = useAuth();
    let dispatch = useDispatch();
    let cart = useSelector(state => state.cart.cart);//this is cart object which comes from database
    let userCartItems = cart.cart; //in cart object we have cart[] array which have all the details off cart items
    let toast = useToast();
    console.log(userCartItems);

    let getTotalPrice = cart.cart?.map(item => item.totalPrice);//getting all the totalPrice of all carts
    let subtotal = getTotalPrice?.reduce((acc, item) => acc + item, 0);

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
        // <Box minH={"100vh"} p={50}>
        //     <Flex direction='column' justify="space-between" rowGap={"50px"}>
        //         <Box w='100%' >
        //             {userCartItems?.map((item) => (
        //                 <Flex key={item._id}
        //                     gap="30px" alignItems="center" justifyContent={"space-between"}
        //                     px="20px" py="10px" borderWidth={1}
        //                     borderRadius="md" mb={"30px"} >
        //                     <Flex alignItems={"center"}>
        //                         <MdCancel fontSize={22} color='#ff0000' cursor={"pointer"} onClick={() => handleDelteItem(item._id)} />
        //                         <Image src={item.image} alt="MSI RTX 4070 Super Gaming X Slim 12GB" boxSize="100px" />
        //                     </Flex>
        //                     <Flex 
        //                         alignItems={"center"}
        //                         width={"100%"}
        //                         flexDir={{ xl: "row", lg: "row", md: "row",  sm: "column"}}
        //                         gap={"20px"}
        //                         flexWrap={"wrap"}
        //                     >
        //                         <Box flex="1" ml={4}>
        //                             <Text fontSize={"15px"} fontWeight="bold">{item.title}</Text>
        //                         </Box>

        //                         <Box>
        //                             <Text>₹{item.price}</Text>
        //                         </Box>
        //                         <HStack spacing={0}>
        //                             <Button
        //                                 // colorScheme="red"
        //                                 bg={"#ff0000"}
        //                                 color={"white"}
        //                                 borderRightRadius={0}
        //                                 onClick={() => handleDecrement(item._id, item.qty)}
        //                                 _hover={{ bg: "white", color: "black" }}
        //                                 border=".5px solid #d6d6d68c"

        //                             >
        //                                 -
        //                             </Button>
        //                             <Box
        //                                 borderWidth="1px"
        //                                 borderColor="gray.200"
        //                                 px={4}
        //                                 py={2}
        //                                 display="flex"
        //                                 alignItems="center"
        //                                 border=".5px solid #d6d6d68c"
        //                             >
        //                                 <Text>{item.qty}</Text>
        //                             </Box>
        //                             <Button
        //                                 bg={"#ff0000"}
        //                                 color={"white"}
        //                                 borderLeftRadius={0}
        //                                 onClick={() => handleIncrement(item._id, item.qty)}
        //                                 _hover={{ bg: "white", color: "black" }}
        //                                 border=".5px solid #d6d6d68c"
        //                             >
        //                                 +
        //                             </Button>
        //                         </HStack>
        //                         <Box>
        //                             <Text fontWeight="bold" color="red.500">₹{item.totalPrice}</Text>
        //                         </Box>
        //                     </Flex>

        //                 </Flex>

        //             ))
        //             }
        //         </Box>


        //         <Box w='100%' p={4} borderWidth={1} borderRadius="md">
        //             <Text fontWeight="bold">Cart Totals</Text>
        //             <Flex justify="space-between" mt={4}>
        //                 <Text>Subtotal</Text>
        //                 <Text>₹{subtotal}</Text>
        //             </Flex>
        //             <RadioGroup defaultValue="1" mt={4}>
        //                 <Stack direction="column">
        //                     <Radio value="1">Home Delivery</Radio>
        //                     <Radio value="2">Offline Store Pickup</Radio>
        //                 </Stack>
        //             </RadioGroup>
        //             <Flex alignItems={"center"} justify="space-between" mt={4}>
        //                 <Text fontSize={30} fontFamily={"sans-serif"} fontWeight={"Bolder"}>Total</Text>
        //                 <Text fontSize={24} fontFamily={"sans-serif"} fontWeight="bold" color="red.500">₹{subtotal}</Text>
        //             </Flex>
        //             <Button bg="#ff0000" color={"white"} w="full" mt={4}>Proceed To Checkout</Button>
        //         </Box>
        //     </Flex >
        // </Box >

        <section className="container mx-auto my-3 flex w-full flex-col gap-3 px-4 ">
            {/* Mobile cart table */}
            {userCartItems?.map((item) => (
                <div key={item._id} className="flex w-full border px-4 py-4  max-sm:flex-col max-sm:justify-center max-sm:items-center">
                    <img
                        className="self-start object-contain w-44 max-md:w-40 max-sm:w-32 max-sm:self-center"
                        src={item.image}
                        alt="bedroom image"
                    />
                    <div className="ml-3 flex w-full flex-col justify-center max-sm:items-center">
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold max-sm:text-center">{item.title}</p>
                        </div>
                        {/* Additional code for size and price remains unchanged */}
                        <p className="py-3 text-xl font-bold text-violet-900">
                            Price: ₹{item.price}
                        </p>
                        <p className="text-xl font-bold text-violet-900">
                            Subtoal: ₹{item.totalPrice}
                        </p>
                        <div className="mt-4 flex w-full items-center justify-between">
                            <div className="flex items-center justify-center">
                                <button
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                    onClick={() => handleDecrement(item._id, item.qty)}
                                >
                                    −
                                </button>
                                <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                    {item.qty}
                                </div>
                                <button
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                    onClick={() => handleIncrement(item._id, item.qty)}
                                >
                                    +
                                </button>
                            </div>
                            <FaTrashAlt
                                onClick={() => handleDelteItem(item._id)}
                                className="m-0 h-5 w-5 cursor-pointer"
                            />
                        </div>
                    </div>

                </div>
            ))}
            <div class="border py-5 px-4 shadow-md mt-12">
                <p class="font-bold">ORDER SUMMARY</p>
                <div class="flex justify-between border-b py-5">
                    <p>Subtotal</p><p>₹{subtotal}</p>
                </div>
                <div class="flex justify-between border-b py-5">
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div class="flex justify-between py-5">
                    <p>Total</p>
                    <p>₹{subtotal}</p>
                </div>
                <a href="#">
                    <button class="w-full bg-violet-900 px-5 py-2 text-white  rounded-md">Proceed to checkout</button>
                </a>
            </div>
        </section>
    );
}

export default CartPage;