import { Box, Container, Flex, Input } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'
import { useNavigate } from 'react-router-dom'

const AuthUser = () => {
    let navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('userInfo');
        if (user) {
            navigate("/");
        }
    }, [navigate])


    return (
        <Container maxW="xl" centerContent >
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" textAlign="center" fontFamily="Work sans">ModXTech</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs isFitted variant="soft-rounded">
                    <TabList mb="1em">
                        <Tab>Login</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default AuthUser