import { Heading, Text, HStack, Avatar, Stack } from '@chakra-ui/react';
import React from 'react';
import { postingById } from '../../hooks/types/queryType';

type Props = {
  posting: postingById;
};

const PostingDetail = ({ posting }: Props) => {
  return (
    <>
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
            {new Date(posting.createdAt).toLocaleDateString('en-US')}
          </Text>
        </Stack>
      </HStack>
    </>
  );
};

export default PostingDetail;
