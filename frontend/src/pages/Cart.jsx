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
        user &&
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
                        <p className="py-3 text-xl font-bold ">
                            Price: ₹{item.price}
                        </p>
                        <p className="text-xl font-bold  text-primary">
                            Subtoal: ₹{item.totalPrice}
                        </p>
                        <div className="mt-4 flex w-full items-center justify-between">
                            <div className="flex items-center justify-center">
                                <button
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-primary focus:ring-2 outline-none active:ring-2 active:ring-gray-500 hover:text-white"
                                    onClick={() => handleDecrement(item._id, item.qty)}
                                >
                                    −
                                </button>
                                <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                    {item.qty}
                                </div>
                                <button
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-primary focus:ring-2 outline-none active:ring-2 active:ring-gray-500 hover:text-white"
                                    onClick={() => handleIncrement(item._id, item.qty)}
                                >
                                    +
                                </button>
                            </div>
                            <FaTrashAlt
                                onClick={() => handleDelteItem(item._id)}
                                className="m-0 h-5 w-5 cursor-pointer hover:text-primary"
                            />
                        </div>
                    </div>

                </div>
            ))}
            <div class="border py-5 px-4 shadow-md mt-12">
                <p class="font-bold">ORDER SUMMARY</p>
                <div class="flex justify-between border-b py-5">
                    <p className='font-simbold'>Subtotal</p><p>₹{subtotal}</p>
                </div>
                <div class="flex justify-between border-b py-5">
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div class="flex justify-between items-center py-5">
                    <p className='font-simbold'>Total</p>
                    <p className='text-primary font-bold text-2xl'>₹{subtotal}</p>
                </div>
                <a href="#">
                    <button class="w-full bg-primary px-5 py-2 text-white  rounded-md font-bold hover:bg-red-600 transition-all ease duration-300">Proceed to checkout</button>
                </a>
            </div>
        </section>
    );
}

export default CartPage;