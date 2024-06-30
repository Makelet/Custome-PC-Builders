import { Button } from '@chakra-ui/react'
import React from 'react'

const AddToCartBtn = ({ handleAddCart }) => {
    return (
        <Button variant='ghost' colorScheme='blue' onClick={handleAddCart}>
            Add to cart
        </Button>
    )
}

export default AddToCartBtn