import React from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/Context';
import { useToast } from '@chakra-ui/react';

const Login = () => {
    let navigate = useNavigate();
    let [show, setShow] = useState(false);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [loading, setLoading] = useState(false);
    let { URL } = useAuth();
    let toast = useToast();
    const submitHandler = async () => {
        setLoading(true);

        if (!email || !password) {
            alert("Fill all the Fields");
            setLoading(false);
            return;
        }

        try {
            let res = await axios.post(`${URL}/api/user/login`, { email, password })
            console.log(res);

            if (res.data.status !== false) {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                setLoading(false);
                navigate("/");
            }
            else {
                toast({
                    title: 'User Does not Exist.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top'
                })
                setLoading(false);
            }
        }
        catch (e) {
            console.log(e);
            setLoading(false)
        }


    }

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}

            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login