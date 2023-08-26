import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';

const BoardTopPage = () => {
  const router = useRouter();
  return (
    <Layout title='Board Top'>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Welcome to{' '}
            <Text as={'span'} color={'orange.400'}>
              Gamers Board
            </Text>
          </Heading>
          <Text color={'white'} maxW={'3xl'}>
            Discuss and share your knowledge of games and improve your
            techniques through friendly competition.
          </Text>
          <Stack spacing={6}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}
              onClick={() => router.push('/board')}
            >
              Go Board & Posting
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
};

export default BoardTopPage;
