import { Button } from '@chakra-ui/react'
import React from 'react'

const AddToCartBtn = ({ handleAddCart }) => {
    return (
        <Button width={"100%"} bg='#ff0000' color={"white"} _hover={{ bg: "black" }} onClick={handleAddCart}>
            Add to cart
        </Button>
    )
}

export default AddToCartBtn