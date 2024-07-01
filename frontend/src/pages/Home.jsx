import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { useAuth } from '../Context/Context';
import { Box, Container, Flex, Grid, useToast } from '@chakra-ui/react';
import { transform } from 'framer-motion';

const Home = () => {
    let [allProducts, setAllProducts] = useState();
    let [isLoading, setIsLoading] = useState(false);
    let { URL } = useAuth();

    let toast = useToast();

    const fetchData = async () => {

        try {
            setIsLoading(true);
            let res = await axios.get(`${URL}/allproducts`)
            // console.log(res);
            setAllProducts(res.data);
            setIsLoading(false);
        } catch (e) {
            toast({
                title: 'Error.',
                description: "There is something wrong.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Flex
            marginTop={"80px"}
            width="100%"
            justifyContent="center"
            flexDir="row"
            flexWrap="wrap"
            gap="60px"
        >
            {
                allProducts?.map((item) => (
                    <ProductCard
                        key={item._id}
                        productId={item.id}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                    />  
                ))
            }
        </Flex>


    )
}

export default Home