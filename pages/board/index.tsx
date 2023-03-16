import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { BsArrowUpRight } from 'react-icons/bs';
import { Layout } from '../../components/Layout';
import { useQueryPosting } from '../../hooks/useQueryPosting';
const BoardPage = () => {
  const { data: postings } = useQueryPosting();
  return (
    <Layout title='Board'>
      <Flex>
        {postings &&
          postings.map((posting) => (
            <Box
              key={posting.id}
              w='xs'
              rounded={'sm'}
              my={5}
              mx={[0, 5]}
              overflow={'hidden'}
              bg='lightgrey'
              border={'1px'}
              borderColor='black'
              shadow='xl'
            >
              <Box p={4}>
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
                    <Text fontSize={'md'} fontWeight={'semibold'}>
                      View more
                    </Text>
                  </Link>
                  <BsArrowUpRight />
                </Flex>
              </HStack>
            </Box>
          ))}
      </Flex>
    </Layout>
  );
};
export default BoardPage;
