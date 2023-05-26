import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
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

const DetailPostingPage = () => {
  const router = useRouter();
  const { postingId } = router.query;
  const [openComments, setOpenComments] = useState(false);
  const [comment, setComment] = useState('');
  const { commentPostingMutation, deletePostingMutation } =
    useMutatePosting(postingId);
  const { data: posting, status } = useQueryPostingId(postingId);
  const { data: comments } = useQueryComment(postingId);
  const { data: user } = useQueryUser();
  if (status === 'loading') return <Spinner />;

  const newComment = (e: { preventDefault: () => void }) => {
    // e.preventDefault();
    commentPostingMutation.mutate({ comment });
    setComment('');
  };

  const deletePosting = (id: string) => {
    deletePostingMutation.mutate(id);
    router.push('/board');
  };

  // console.log(comments);
  // console.log(user);

  return (
    <>
      {posting && (
        <Container maxW={'7xl'} p='12'>
          <ArrowBackIcon onClick={() => router.push('/board')} />
          <span>Back Main Board</span>
          <Box maxW='md' bg='gray.100' mt={2}>
            <Box pb={1}>
              <Heading color={'black'} fontSize={'h1'} noOfLines={1}>
                {posting.title}
              </Heading>
              <Text color={'gray.500'} noOfLines={2}>
                {posting.content}
              </Text>
            </Box>
            <HStack borderTop={'1px'} color='black' pt={2} pb={1}>
              <Flex alignItems='center' justifyContent={'end'}>
                <ChatIcon
                  onClick={() => setOpenComments(!openComments)}
                  pt={1}
                />
              </Flex>
              <Flex>
                {posting.userId === user?.id ? (
                  <DeleteIcon onClick={() => deletePosting(posting.id)} />
                ) : (
                  <></>
                )}
              </Flex>
            </HStack>
          </Box>

          <Stack>
            {comments &&
              comments.map((com) => (
                <Box key={com.id}>
                  <Box>
                    <span>@{com?.userId}</span>
                  </Box>
                  <Box>
                    <span>{com.comment}</span>
                  </Box>
                  <span>{new Date(com.timestamp).toLocaleString()}</span>
                </Box>
              ))}
          </Stack>
          {openComments && (
            <>
              <form onSubmit={newComment}>
                <div>
                  <input
                    type='text'
                    placeholder='Type new comment...'
                    value={comment}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setComment(e.target.value)
                    }
                  />
                  <button disabled={!comment} type='submit'>
                    submit
                  </button>
                </div>
              </form>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default DetailPostingPage;
