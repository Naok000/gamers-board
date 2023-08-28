import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  Wrap,
  WrapItem,
  Img,
  Center,
  Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { Layout } from '../../components/Layout';
import { useQueryPosting } from '../../hooks/useQueryPosting';

const BoardPage = () => {
  const { data: postings, status } = useQueryPosting();
  const [query, setQuery] = useState('');
  if (status === 'loading') return <Spinner />;
  return (
    <Layout title='Board'>
      <Box>
        <Center>
          <Input
            id='search'
            w='20rem'
            bg='lightblue'
            borderRadius='10px'
            border='1px'
            mt={5}
            placeholder='Enter Post Title'
            type='search'
            onChange={(e) => setQuery(e.target.value)}
          />
        </Center>
      </Box>
      <Wrap>
        {postings &&
          postings
            .filter((post) => {
              return post.title.toLowerCase().includes(query.toLowerCase());
            })
            .map((posting) => (
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
                      {posting.content}
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
            ))}
      </Wrap>
    </Layout>
  );
};

export default BoardPage;
