import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Img,
  Spacer,
  Spinner,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  useQueryComment,
  useQueryPostingId,
} from '../../hooks/useQueryPosting';
import { ArrowBackIcon, ChatIcon, DeleteIcon } from '@chakra-ui/icons';
import { useMutatePosting } from '../../hooks/useMutatePosting';
import { useQueryUser } from '../../hooks/useQueryUser';
import { Layout } from '../../components/Layout';
import { MdClose, MdOutlinePostAdd } from 'react-icons/md';
import { deleteObject, ref } from 'firebase/storage';
import { storage, storageImageFileRef } from '../../lib/firebase';

const DetailPostingPage = () => {
  const router = useRouter();
  const { postingId } = router.query;
  const [openComments, setOpenComments] = useState(false);
  const [comment, setComment] = useState('');
  const { commentPostingMutation, deletePostingMutation } =
    useMutatePosting(postingId);
  const { data: posting } = useQueryPostingId(postingId);
  const { data: comments } = useQueryComment(postingId);
  const { data: user, status } = useQueryUser();
  if (status === 'error') {
    router.push('/auth/login');
  } else if (status === 'loading') {
    return <Spinner />;
  }

  const newComment = async () => {
    await commentPostingMutation.mutate({ comment });
    setComment('');
    router.reload();
  };

  const deletePosting = async (id: string) => {
    await deletePostingMutation.mutate(id);
    if (
      !ref(
        storage,
        storageImageFileRef + `/default_images/${posting?.gameTitle}.jpg`
      )
    )
      await deleteObject(
        ref(
          storage,
          storageImageFileRef +
            `/images/${posting?.thumbnail.thumbnailFileName}`
        )
      )
        .then(() => {
          console.log('File deleted successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    await router.push('/board');
  };

  return (
    <>
      {posting && (
        <Layout title={posting.title}>
          <Box maxW={'5xl'} p='12'>
            <Button
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/board')}
              variant='link'
              colorScheme='whiteAlpha'
            >
              Back Main Board
            </Button>
            <Center py={6}>
              <Stack
                borderWidth='1px'
                borderRadius='lg'
                w={{ sm: '100%', md: '5xl' }}
                height={{ sm: '2xl', md: '20rem' }}
                direction={{ base: 'column', md: 'row' }}
                boxShadow={'2xl'}
                bg='white'
                p={4}
              >
                <Flex flex={1} bg='blue.200'>
                  <Img
                    objectFit='cover'
                    boxSize='100%'
                    src={posting.thumbnail.imageURL}
                    alt='thumbnail'
                  />
                </Flex>
                <Stack
                  flex={1}
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                  p={1}
                  pt={2}
                >
                  <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {posting.title}
                  </Heading>
                  <Text fontWeight={600} color='gray.500' size='sm' mb={4}>
                    @{posting.gameTitle}
                  </Text>
                  <Text textAlign={'center'} px={3}>
                    {posting.content}
                  </Text>
                  <HStack>
                    <Avatar src={posting.user.avatar.avatarImgURL} />
                    <Stack>
                      <Text fontWeight='600'>{posting.user.userName}</Text>
                      <Text color='gray.500'>
                        {new Date(posting.createdAt).toLocaleDateString(
                          'en-US'
                        )}
                      </Text>
                    </Stack>
                  </HStack>

                  <HStack color='black' pt={2} pb={2}>
                    <Flex alignItems='center'>
                      <Button
                        leftIcon={<ChatIcon pt={1} />}
                        onClick={() => setOpenComments(!openComments)}
                        colorScheme='blue'
                        size='sm'
                      >
                        Comment
                      </Button>
                    </Flex>
                    <Flex>
                      {posting.userId === user?.id ? (
                        <Button
                          leftIcon={<DeleteIcon />}
                          onClick={() => deletePosting(posting.id)}
                          mx={1}
                          size='sm'
                          colorScheme='red'
                          variant='solid'
                        >
                          Delete
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Flex>
                  </HStack>
                </Stack>
              </Stack>
            </Center>

            <Stack overflowY={'auto'}>
              {comments &&
                comments.map((com) => (
                  <Box
                    key={com.id}
                    maxW={'5xl'}
                    bg='white'
                    p={2}
                    borderRadius='lg'
                  >
                    <HStack>
                      <Avatar src={com.user.avatar.avatarImgURL} />
                      <Stack>
                        <Heading size='sm' fontWeight={'medium'}>
                          @{com.user.userName}
                        </Heading>
                        <Box>{com.comment}</Box>
                      </Stack>
                      <Spacer />
                      <Box color='gray.500'>
                        {new Date(com.timestamp).toLocaleString()}
                      </Box>
                    </HStack>
                  </Box>
                ))}
            </Stack>
            {openComments && (
              <Stack bg='white' mt={2} p={2} borderRadius='lg'>
                <FormControl id='comment'>
                  <Box>
                    <Textarea
                      name='comment'
                      placeholder='Enter new comment...'
                      value={comment}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setComment(e.target.value)
                      }
                    />
                  </Box>
                </FormControl>
                <HStack>
                  <Spacer />
                  <Button
                    leftIcon={<MdOutlinePostAdd />}
                    isDisabled={!comment}
                    type='submit'
                    colorScheme='teal'
                    onClick={() => newComment()}
                  >
                    post
                  </Button>
                  <Button
                    leftIcon={<MdClose />}
                    onClick={() => {
                      setOpenComments(!openComments);
                      setComment('');
                    }}
                  >
                    Close
                  </Button>
                </HStack>
              </Stack>
            )}
          </Box>
        </Layout>
      )}
    </>
  );
};

export default DetailPostingPage;
