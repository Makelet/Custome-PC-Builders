import React, { useState } from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/Context';

const Signup = () => {

    let navigate = useNavigate();
    let [show, setShow] = useState(false);
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [conpassword, setConPassword] = useState("");
    let [pic, setPic] = useState("");
    let [loading, setLoading] = useState(false);
    let { URL } = useAuth();


    const submitHandler = async () => {
        setLoading(true);

        if (!name || !email || !password || !conpassword) {
            alert("Fill all the Fields");
            setLoading(false);
            return;
        }
        if (password !== conpassword) {
            alert("Password not match");
            setLoading(false);
            return;
        }

        try {
            let res = await axios.post(`${URL}/api/user`, { name, email, password })
            console.log(res);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            setLoading(false);
            navigate("/");

           
        }
        catch (e) {
            console.log(e);
        }

        setLoading(false)

    }


    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type='text'
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
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
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        value={conpassword}
                        onChange={(e) => setConPassword(e.target.value)}
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
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup