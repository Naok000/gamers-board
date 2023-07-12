import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import SideNav from '../../components/SideNav';
import { useMutateAdmin } from '../../hooks/useMutateAdmin';
import { useQueryAdminPosting } from '../../hooks/useQueryAdmin';

const postingList = () => {
  const { data: postingList } = useQueryAdminPosting();
  const { deletePostingAdminMutation } = useMutateAdmin();
  const deletePosting = (postId: string) => {
    deletePostingAdminMutation.mutate(postId);
  };
  return (
    <SideNav>
      <Head>
        <title>Posting List</title>
      </Head>
      {postingList && (
        <>
          <TableContainer>
            <Table size='md' variant='simple' maxW='50%'>
              <Thead>
                <Tr>
                  <Th>Posting Title</Th>
                  <Th>Created At</Th>
                  <Th>Contributor</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {postingList.map((post) => (
                  <Tr key={post.id}>
                    <Td>{post.title}</Td>
                    <Td>{new Date(post.createdAt).toDateString()}</Td>
                    <Td>{post.user.userName}</Td>
                    <Td>
                      <Button onClick={() => deletePosting(post.id)}>
                        <DeleteIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </SideNav>
  );
};

export default postingList;
