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
import SideNav from '../../components/SideNav';
import { useMutateAdmin } from '../../hooks/useMutateAdmin';
import { useQueryAdminUser } from '../../hooks/useQueryAdmin';

const UserList = () => {
  const { data: users } = useQueryAdminUser();
  const { deleteUserAdminMutation } = useMutateAdmin();
  const deleteUser = (id: string) => {
    deleteUserAdminMutation.mutate(id);
  };
  return (
    <SideNav>
      <Head>
        <title>User List</title>
      </Head>
      {users && (
        <>
          <TableContainer>
            <Table size='sm' variant='simple' maxW='50%'>
              <Thead>
                <Tr>
                  <Th>User Name</Th>
                  <Th>User email</Th>
                  <Th>User Role</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.userName || user.id}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      <Button onClick={() => deleteUser(user.id)}>
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

export default UserList;
