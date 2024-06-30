import React, { useEffect, useState } from 'react';
import { Box, Flex, Input, Image, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button } from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Logo from '../assets/asset 0.png';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
import { useAuth } from '../Context/Context';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let cart = useSelector(state => state.cart.cart);
    // let totalQty = cart.reduce((acc, item) => acc += item.qty, 0);
    // console.log(totalQty);
    let { user } = useAuth();

    let navigate = useNavigate()



    const logoutUser = () => {
        localStorage.removeItem("userInfo")
        navigate("/my-account/user");
    }

    return (
        <Flex className='main_navbar' width={"100%"} justify='space-between' align='center' p={{ base: '0 20px', md: '0 70px' }} pos={"sticky"} top={0} left={0} zIndex={10} bg={"white"} boxShadow="1px 1px 30px #cbcbcb99">
            <Box className='logo'>  
                <Image src={Logo} alt='Logo' cursor={"pointer"} onClick={() => navigate("/")} height={{ base: '70px', md: '100px' }} />
            </Box>
            <Box className='search-bar' w={{ base: '60%', md: '30%' }}>
                <Input type='text' placeholder='Search' />
            </Box>
            <Flex display={{ base: 'none', md: 'flex' }} className='navbar' w='50%' justify='center'>
                <Box as='nav'>
                    <Flex as='ul' listStyleType='none'>
                        <Box as='li' mx='22px'>
                            <a href='#'>Custom PC</a>
                        </Box>
                        <Box as='li' mx='22px'>
                            <a href='#'>Contact Us</a>
                        </Box>
                        <Box as='li' mx='22px'>
                            <a href='#'>We Are Hiring</a>
                        </Box>
                    </Flex>
                </Box>
                <Flex className='icon-section' alignItems={"center"} gap='20px' ml='20px'>
                    {user ?
                        <Menu>
                            <MenuButton >
                                <IconButton _hover={{ color: "white", bg: "#ff0000" }} icon={<FaUser />} aria-label="User" />
                            </MenuButton>
                            <MenuList>
                                <MenuItem _hover={{ color: "white", bg: "#ff0000" }}>My Profile</MenuItem>
                                <MenuItem _hover={{ color: "white", bg: "#ff0000" }} onClick={logoutUser}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                        :
                        <Menu>
                            <MenuButton >
                                <IconButton _hover={{ color: "white", bg: "#ff0000" }} icon={<FaUser />} aria-label="User" />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => navigate('/my-account/user')}>Login/Signup</MenuItem>
                            </MenuList>
                        </Menu>
                    }
                    <IconButton _hover={{ color: "white", bg: "#ff0000" }}
                        icon={<FaHeart />} aria-label="Wishlist" />
                    <IconButton _hover={{ color: "white", bg: "#ff0000" }} onClick={() => navigate('/cart')} icon={<FaShoppingCart />} aria-label="Cart" />
                </Flex>
            </Flex>
            <IconButton
                aria-label='Open Menu'
                icon={<HamburgerIcon />}
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
            />
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <Box as='nav'>
                            <Box as='ul' listStyleType='none' p='0'>
                                <Box as='li' my='10px'>
                                    <a href='#'>Custom PC</a>
                                </Box>
                                <Box as='li' my='10px'>
                                    <a href='#'>Contact Us</a>
                                </Box>
                                <Box as='li' my='10px'>
                                    <a href='#'>We Are Hiring</a>
                                </Box>
                            </Box>
                        </Box>
                        <Flex className='icon-section' gap='20px' mt='20px'>
                            <IconButton icon={<FaUser />} aria-label="User" />
                            <IconButton icon={<FaHeart />} aria-label="Wishlist" />
                            <IconButton icon={<FaShoppingCart />} aria-label="Cart" />
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex >
    );
};

export default Navbar;