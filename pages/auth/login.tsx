import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import AuthFormItem from '../../components/auth/AuthFormItem';
import CommonButton from '../../components/CommonButton';
import { Layout } from '../../components/Layout';
import { getUserSession } from '../../hooks/useQueryUser';
import { currentUserId } from '../../recoil/boardState';
import { toastSummary } from '../../utils/toastSummary';

const Login = () => {
  const router = useRouter();
  const { errorLoginToast, loginToast } = toastSummary();
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
      loginToast();
      await router.push('/board');
    } catch (err) {
      errorLoginToast();
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
      loginToast();
      await router.push('/board');
    } catch (err) {
      errorLoginToast();
      console.log(err);
    }
  };
  return (
    <Layout title='Sign In'>
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
              <AuthFormItem
                id='email'
                label='Email address'
                type='email'
                value={email}
                changeAct={(e) => setEmail(e.target.value)}
              />
              <AuthFormItem
                id='password'
                label='Password'
                type='password'
                value={password}
                changeAct={(e) => setPassword(e.target.value)}
              />
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
                <CommonButton
                  bg={'blue.400'}
                  color={'white'}
                  hover={{
                    bg: 'blue.500',
                  }}
                  clickAct={signInEmail}
                  disable={!email || !password}
                  text='Sign In'
                />
                <CommonButton
                  bg={'orange.400'}
                  color={'white'}
                  hover={{
                    bg: 'orange.500',
                  }}
                  clickAct={testSignIn}
                  text='Guest Login'
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Login;
