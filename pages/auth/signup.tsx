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
  IconButton,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getUserSession } from '../../hooks/useQueryUser';
import { storage } from '../../lib/firebase';
import { generateFileName } from '../../lib/generateFileName';
import { currentUserId } from '../../recoil/boardState';

const signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarImg, setAvatarImg] = useState<File | null>(null);
  const setUser = useSetRecoilState(currentUserId);
  const router = useRouter();
  let url = '';

  const postSignUp = async () => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      userName,
      email,
      password,
      url,
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImg(e.target.files![0]);
      e.target.value = '';
    }
  };

  const signupInEmail = async () => {
    try {
      if (avatarImg) {
        const fileName = generateFileName(avatarImg.name);
        const refStorageAvatars = ref(storage, `avatars/${fileName}`);

        await uploadBytes(refStorageAvatars, avatarImg);
        url = await getDownloadURL(refStorageAvatars);
        await postSignUp();
      } else {
        url = await getDownloadURL(
          ref(storage, 'default_avatar/AdobeStock_64675209.jpeg')
        );
        await postSignUp();
      }
      setEmail('');
      setPassword('');
      const user = await getUserSession();
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
      bgGradient='linear(to-l,rgba(7,27,82,1) 0%, rgba(0,128,128,1) 100%)'
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
            <Box textAlign='center'>
              <FormControl id='avatar'>
                <FormLabel>Select Avatar</FormLabel>
                <Input
                  id='avatar'
                  type='file'
                  ref={inputRef}
                  accept='image/*'
                  hidden
                  onChange={onChangeImageHandler}
                />
                <IconButton
                  aria-label='avatar'
                  icon={
                    avatarImg ? (
                      <Avatar bg='teal.500'>
                        <AvatarBadge boxSize='1.25rem' bg='blue.500' />
                      </Avatar>
                    ) : (
                      <Avatar bg='teal.500'>
                        <AvatarBadge boxSize='1.25rem' bg='red' />
                      </Avatar>
                    )
                  }
                  onClick={onButtonClick}
                />
              </FormControl>
            </Box>
            <FormControl id='userName' isRequired>
              <FormLabel>User Name</FormLabel>
              <Input
                type='userName'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </FormControl>

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
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={signupInEmail}
                isDisabled={!userName || !email || !password}
              >
                Sign up
              </Button>
              <Stack pt={3}>
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
