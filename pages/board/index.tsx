import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsArrowUpRight } from 'react-icons/bs';
import { Layout } from '../../components/Layout';
import { useQueryPosting } from '../../hooks/useQueryPosting';
const BoardPage = () => {
  const { data: postings } = useQueryPosting();
  return (
    <Layout title='Board'>
      <Wrap>
        {postings &&
          postings.map((posting) => (
            <WrapItem key={posting.id}>
              <Box
                w='xs'
                rounded={'sm'}
                my={2}
                mx={[0, 2]}
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
            </WrapItem>
          ))}
      </Wrap>
    </Layout>
  );
};
export default BoardPage;
