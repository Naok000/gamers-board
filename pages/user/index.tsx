import {
  Box,
  Text,
  Heading,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Table,
  Flex,
  Avatar,
  Center,
  Spinner,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import { BsArrowUpRight } from 'react-icons/bs';
import { TbUserOff } from 'react-icons/tb';
import { GrUserSettings } from 'react-icons/gr';
import { Layout } from '../../components/Layout';
import { useMutateUser } from '../../hooks/useMutateUser';
import { useQueryOwnPosting } from '../../hooks/useQueryPosting';
import { useQueryUser } from '../../hooks/useQueryUser';

const MyPage = () => {
  const { data: user, status } = useQueryUser();
  const { data: ownPosting } = useQueryOwnPosting();
  const { deleteUserMutation } = useMutateUser();
  if (status === 'loading') return <Spinner />;

  return (
    <Layout title='Mypage'>
      <Flex
        p={4}
        flex={{ base: 0, md: 'auto' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        {user && (
          <Center py={6} alignItems='start'>
            <Box
              maxW='320px'
              w='full'
              bg='white'
              boxShadow='2xl'
              rounded='lg'
              p={6}
              textAlign='center'
            >
              <Avatar
                size='lg'
                mb={4}
                pos={'relative'}
                src={user.avatar.avatarImgURL}
              />

              <Heading fontSize='2xl' fontFamily='body' mb={4}>
                <Box>{user.userName || 'Jhon Doe'}</Box>
              </Heading>

              <Heading size='sm' color='gray.600'>
                Joined
              </Heading>
              <Box>{new Date(user.createdAt).toDateString()}</Box>
              <Menu variant='ghost'>
                <MenuButton as={Button} leftIcon={<GrUserSettings />}>
                  Settings
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => deleteUserMutation.mutate()}
                    isDisabled={
                      user.userName === 'testuser' ||
                      user.userName === 'Test_User'
                    }
                  >
                    <TbUserOff />
                    <span>Delete User</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Center>
        )}
        <Box
          w={{ base: '320px', sm: 'md', lg: '3xl' }}
          justifyContent={{ base: 'center' }}
          m={6}
          p={4}
          boxShadow='2xl'
          bg='white'
          rounded='lg'
        >
          <Heading size='md' p={2}>
            Own Posting
          </Heading>
          {ownPosting?.length !== 0 ? (
            ownPosting?.map((post) => (
              <TableContainer key={post.id}>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Heading size='sm'>{post.title}</Heading>
                        <Box color='gray.400'>{post.gameTitle}</Box>
                      </Td>
                      <Td>
                        <Flex justifyContent='end'>
                          <Link href={`board/${post.id}`}>
                            <BsArrowUpRight />
                          </Link>
                        </Flex>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            ))
          ) : (
            <Flex alignItems='center' justify='center' justifyContent='center'>
              <Text fontSize='3xl' fontWeight='bold'>
                No Posting Contents
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

export default MyPage;
