import {
  Button,
  Container,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';

const BoardTopPage = () => {
  const router = useRouter();
  return (
    <Layout title='Board Top'>
      <Container w={{ base: '', sm: 'md', md: 'xl' }}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
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
          <HStack spacing={6}>
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
            <Link
              href='https://www.loom.com/share/99cbce3d01474d06b2166cef9d7083a7?sid=297dd0cd-f979-46c2-ac4a-fd8567b630f4'
              isExternal
            >
              <Button
                rounded={'full'}
                px={6}
                bg={'gray.300'}
                _hover={{ bg: 'gray.500' }}
              >
                How to Use
              </Button>
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Layout>
  );
};

export default BoardTopPage;
