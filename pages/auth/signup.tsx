import {
  Text,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { hiddenInputFeature } from '../../components/input_file_image/hiddenInputFeature';
import { INIT_SIGNUP_DATA } from '../../consts/auth/stateInit';
import AuthFormItem from '../../components/auth/AuthFormItem';
import InputFileIconButton from '../../components/input_file_image/InputFileIconButton';
import CommonButton from '../../components/CommonButton';
import { signupFeature } from '../../utils/auth/signupFeature';
import AvatarWithBadge from '../../components/auth/AvatarWithBadge';

const signup = () => {
  const [avatarImg, setAvatarImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string>('');

  const [signUpUser, setSignUpUser] = useState(INIT_SIGNUP_DATA);

  const { inputRef, onButtonClick, onChangeImageHandler } = hiddenInputFeature(
    setAvatarImg,
    setPreviewImg
  );

  const { signupInEmail } = signupFeature(
    signUpUser,
    avatarImg,
    setAvatarImg,
    setSignUpUser,
    setPreviewImg,
    previewImg
  );

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
                  <InputFileIconButton
                    name='avatar'
                    label='avatar'
                    inputReference={inputRef}
                    changeAct={onChangeImageHandler}
                    iconElement={
                      avatarImg ? (
                        <AvatarWithBadge src={previewImg} badgeBg='blue.500' />
                      ) : (
                        <AvatarWithBadge avatarBg='teal.500' badgeBg='red' />
                      )
                    }
                    clickAct={onButtonClick}
                  />
                </FormControl>
              </Box>
              <AuthFormItem
                id='userName'
                label='User Name'
                type='userName'
                value={signUpUser.userName}
                changeAct={(e) =>
                  setSignUpUser({ ...signUpUser, userName: e.target.value })
                }
              />
              <AuthFormItem
                id='email'
                label='Email Address'
                type='email'
                value={signUpUser.email}
                changeAct={(e) =>
                  setSignUpUser({ ...signUpUser, email: e.target.value })
                }
              />
              <AuthFormItem
                id='password'
                label='Password'
                type='password'
                value={signUpUser.password}
                changeAct={(e) =>
                  setSignUpUser({ ...signUpUser, password: e.target.value })
                }
              />
              <Stack spacing={4}>
                <CommonButton
                  bg={'blue.400'}
                  color={'white'}
                  hover={{
                    bg: 'blue.500',
                  }}
                  clickAct={signupInEmail}
                  disable={
                    !signUpUser.userName ||
                    !signUpUser.email ||
                    !signUpUser.password
                  }
                  text='Sign up'
                />
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
