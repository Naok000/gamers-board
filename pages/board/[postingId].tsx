import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Img,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import {
  useQueryComment,
  useQueryPostingId,
} from '../../hooks/useQueryPosting';
import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons';
import { useQueryUser } from '../../hooks/useQueryUser';
import { Layout } from '../../components/Layout';
import AlertDeleteDialog from '../../components/board/AlertDeleteDialog';
import CommentItem from '../../components/board/CommentItem';
import CommentForm from '../../components/board/CommentForm';
import CommonButton from '../../components/CommonButton';
import { postingInternalFunc } from '../../utils/board/postingInternalFunc';

const DetailPostingPage = () => {
  const router = useRouter();
  const { postingId } = router.query;
  const [openComments, setOpenComments] = useState(false);
  const [comment, setComment] = useState('');

  const { data: user, status } = useQueryUser();
  const { data: posting } = useQueryPostingId(postingId);
  const { data: comments, isSuccess } = useQueryComment(postingId);

  // Ability to post comments and delete listings
  const { newComment, deletePosting } = postingInternalFunc(
    comment,
    postingId,
    posting,
    setComment,
    setOpenComments,
    router
  );

  if (status === 'error') {
    router.push('/auth/login');
  } else if (status === 'loading') {
    return <Spinner size={'xl'} />;
  }

  return (
    <>
      {posting && (
        <Layout title={posting.title}>
          <Box maxW={'5xl'} p='12'>
            <CommonButton
              icon={<ArrowBackIcon />}
              clickAct={() => router.push('/board')}
              variant='link'
              scheme='whiteAlpha'
              text='Back Main Board'
            />
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
                      <CommonButton
                        icon={<ChatIcon pt={1} />}
                        clickAct={() => setOpenComments(!openComments)}
                        scheme='blue'
                        size='sm'
                        text='Comment'
                      />
                    </Flex>
                    <Flex>
                      {posting.userId === user?.id ? (
                        <AlertDeleteDialog action={() => deletePosting()} />
                      ) : (
                        <></>
                      )}
                    </Flex>
                  </HStack>
                </Stack>
              </Stack>
            </Center>

            <Stack overflowY={'auto'}>
              {isSuccess === true &&
                comments.map((com) => (
                  <CommentItem key={com.id} comment={com} />
                ))}
            </Stack>
            {openComments && (
              <CommentForm
                comment={comment}
                changeAct={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
                postAct={newComment}
                closeAct={() => {
                  setOpenComments(!openComments);
                  setComment('');
                }}
              />
            )}
          </Box>
        </Layout>
      )}
    </>
  );
};

export default DetailPostingPage;
