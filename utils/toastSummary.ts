import { useToast } from '@chakra-ui/react';

export const toastSummary = () => {
  const toast = useToast();

  const loginToast = () => {
    return toast({
      title: 'Successful login',
      description: 'Welcome to Gamers Board',
      position: 'top',
      status: 'success',
      duration: 7000,
      isClosable: true,
    });
  };

  const errorLoginToast = () => {
    return toast({
      title: 'Login failed',
      description: 'Password or Email is incorrect.',
      position: 'top',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const logoutToast = () => {
    return toast({
      title: 'See you again.',
      description: 'Waiting for your next visit.',
      position: 'top',
      status: 'success',
      duration: 7000,
      isClosable: true,
    });
  };

  const successCreateAcountToast = () => {
    return toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const addBookMarkToast = () => {
    return toast({
      title: 'Add Bookmark',
      description: 'Bookmarked this posting',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const removeBookMarkToast = () => {
    return toast({
      title: 'Remove Bookmark',
      description: 'Removed this posting',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const notAuthorizedAlertToast = () => {
    return toast({
      title: 'Not authorized.',
      description: 'Operation not accepted due to lack of authorization',
      position: 'top',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  return {
    loginToast,
    errorLoginToast,
    successCreateAcountToast,
    logoutToast,
    addBookMarkToast,
    removeBookMarkToast,
    notAuthorizedAlertToast,
  };
};
