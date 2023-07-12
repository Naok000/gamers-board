import { Center, Divider, Flex } from '@chakra-ui/react';
import SideNav from '../../components/SideNav';

const AdminBoard = () => {
  return (
    <Flex maxW='2000px' direction='row' overflow='hidden'>
      <SideNav>
        <Center>
          <Divider orientation='vertical' />
        </Center>
      </SideNav>
    </Flex>
  );
};

export default AdminBoard;
