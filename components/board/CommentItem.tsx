import { Avatar, Box, Heading, HStack, Spacer, Stack } from '@chakra-ui/react';
import React from 'react';
import { userComment } from '../../hooks/types/queryType';

type Props = {
  comment: userComment;
};

const CommentItem = ({ comment }: Props) => {
  return (
    <Box key={comment.id} maxW={'5xl'} bg='white' p={2} borderRadius='lg'>
      <HStack>
        <Avatar src={comment.user.avatar.avatarImgURL} />
        <Stack>
          <Heading size='sm' fontWeight={'medium'}>
            @{comment.user.userName}
          </Heading>
          <Box>{comment.comment}</Box>
        </Stack>
        <Spacer />
        <Box color='gray.500'>
          {new Date(comment.timestamp).toLocaleString()}
        </Box>
      </HStack>
    </Box>
  );
};

export default CommentItem;
