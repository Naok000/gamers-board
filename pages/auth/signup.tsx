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
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getUserSession } from '../../hooks/useQueryUser';
import { storage } from '../../lib/firebase';
import { generateFileName } from '../../utils/generateFileName';
import { currentUserId } from '../../recoil/boardState';
import { toastSummary } from '../../utils/toastSummary';
import { Layout } from '../../components/Layout';
import { hiddenInputFeature } from '../../utils/hiddenInputFeature';

const signup = () => {
  const router = useRouter();
  const { successCreateAcountToast } = toastSummary();
  const setUserId = useSetRecoilState(currentUserId);
  const [avatarImg, setAvatarImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string>('');
  const initSignUpData = {
    userName: '',
    email: '',
    password: '',
    url: '',
    fileName: '',
  };
  const [signUpUser, setSignUpUser] = useState(initSignUpData);

  const { inputRef, onButtonClick, onChangeImageHandler } = hiddenInputFeature(
    setAvatarImg,
    setPreviewImg
  );

  const signupInEmail = async () => {
    const postSignUp = async () => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          ...signUpUser,
        }
      );
    };
    try {
      if (avatarImg) {
        signUpUser.fileName = generateFileName(avatarImg.name);
        const refStorageAvatars = ref(
          storage,
          `avatars/${signUpUser.fileName}`
        );

        await uploadBytes(refStorageAvatars, avatarImg);
        signUpUser.url = await getDownloadURL(refStorageAvatars);

        await postSignUp();
      } else {
        signUpUser.url = await getDownloadURL(
          ref(storage, 'default_avatar/AdobeStock_64675209.jpeg')
        );
        await postSignUp();
      }
      setSignUpUser(initSignUpData);
      const user = await getUserSession();
      setUserId(user);
      successCreateAcountToast();
      URL.revokeObjectURL(previewImg);
      setPreviewImg('');
      await router.push('/board');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title='Sign Up'>
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
                        <Avatar bg='teal.500' src={previewImg}>
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
                  value={signUpUser.userName}
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, userName: e.target.value })
                  }
                  required
                />
              </FormControl>

              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  value={signUpUser.email}
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, email: e.target.value })
                  }
                  required
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={signUpUser.password}
                  onChange={(e) =>
                    setSignUpUser({ ...signUpUser, password: e.target.value })
                  }
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
                  isDisabled={
                    !signUpUser.userName ||
                    !signUpUser.email ||
                    !signUpUser.password
                  }
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
    </Layout>
  );
};

export default signup;
