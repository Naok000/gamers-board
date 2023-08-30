import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getUserSession } from '../../hooks/useQueryUser';
import { currentUserId } from '../../recoil/boardState';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUserId = useSetRecoilState(currentUserId);

  const testUserEmail: string = 'testUser@test.com';
  const testUserPassword: string = 'uidjopDHJilkjfskkkd84352';

  const testSignIn = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: testUserEmail,
        password: testUserPassword,
      });
      const user = await getUserSession();
      setUserId(user);
      await router.push('/board');
    } catch (err) {
      console.log(err);
    }
  };

  const signInEmail = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });
      setEmail('');
      setPassword('');
      const user = await getUserSession();
      setUserId(user);
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
      bgGradient='linear(to-l,rgba(7,27,82,1) 0%, rgba(0,128,128,1) 100%)'
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading color={'black'} fontSize={'4xl'}>
            Sign in to your account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='email' isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id='password' isRequired>
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
              >
                <Link href='#'>Forgot password?</Link>
                <Link href='/auth/signup' color={'blue.400'}>
                  Create a new Account
                </Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={signInEmail}
                isDisabled={!email || !password}
              >
                Sign in
              </Button>
              <Button
                bg={'orange.400'}
                color={'white'}
                _hover={{
                  bg: 'orange.500',
                }}
                onClick={testSignIn}
              >
                Gest Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
