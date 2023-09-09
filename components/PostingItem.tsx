import {
  Box,
  Flex,
  Heading,
  HStack,
  Img,
  Link,
  WrapItem,
  Text,
} from '@chakra-ui/react';
import { BsArrowUpRight } from 'react-icons/bs';
import { postingWithImage } from '../hooks/types/queryType';

type Props = {
  posting: postingWithImage;
};

const PostingItem = ({ posting }: Props) => {
  return (
    <WrapItem key={posting.id}>
      <Box
        w='xs'
        rounded={'lg'}
        my={5}
        mx={[0, 5]}
        overflow={'hidden'}
        bg='white'
        border={'1px'}
        borderColor='black'
        boxShadow='xl'
      >
        <Box h='160px' borderBottom={'1px'} borderColor='black'>
          <Img
            alt='thumbnail'
            src={posting.thumbnail.imageURL}
            h='full'
            w='full'
            objectFit='cover'
          />
        </Box>
        <Box p={4}>
          <Box>
            <Text fontSize={'xs'} fontWeight='medium'>
              {posting.gameTitle}
            </Text>
          </Box>
          <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
            {posting.title}
          </Heading>
          <Text color={'gray.500'} noOfLines={2}>
            {posting.content || 'No description'}
          </Text>
        </Box>
        <HStack borderTop={'1px'} color='black'>
          <Flex
            p={4}
            alignItems='center'
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w='full'
          >
            <Link href={`${location.href}/${posting.id}`}>
              <HStack>
                <Text fontSize={'md'} fontWeight={'semibold'}>
                  View more
                </Text>
                <BsArrowUpRight />
              </HStack>
            </Link>
          </Flex>
        </HStack>
      </Box>
    </WrapItem>
  );
};

export default PostingItem;
