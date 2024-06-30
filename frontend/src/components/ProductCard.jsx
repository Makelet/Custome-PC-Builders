import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, useToast } from '@chakra-ui/react'
import AddToCartBtn from './AddToCartBtn'
import { useDispatch, useSelector } from 'react-redux';
import { add, addItems } from '../Store/Slices/CartSlice';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ productId, image, title, price }) => {
    let cart = useSelector(state => state.cart.cart);
    // console.log(cart);

    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
    let toast = useToast();
    let navigate = useNavigate()

    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }, [navigate])
    let dispatch = useDispatch();

    const addToCart = (pId, image, title, price) => {

        if (userInfo) {
            dispatch(addItems(pId, image, title, price, userInfo._id));
        } else {
            toast({
                title: 'Please Login First.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position:'top'
            })
        }
    }

    return (
        <Card width={"300px"} _hover={{ transform: 'scale(1.1)' }} transition={"all ease .5s"}>
            <CardBody>
                <Image
                    src={image}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{title}</Heading>
                    <Text color='blue.600' fontSize='2xl'>
                        ₹{price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <AddToCartBtn handleAddCart={() => addToCart(productId, image, title, price)} />
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default ProductCard