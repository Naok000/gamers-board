import {
  Text,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentUserId } from '../../recoil/boardState';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(currentUserId);
  const router = useRouter();
  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'password'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user/session-id`
    );
    return data;
  };
  const signupInEmail = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email,
        password,
      });
      setEmail('');
      setPassword('');
      const user = await getUser();
      setUser(user);
      await router.push('/board');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Stack spacing={4}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              ></Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={signupInEmail}
                disabled={!email || !password}
              >
                Sign up
              </Button>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link href='/auth/login' color={'blue.400'}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default signup;
