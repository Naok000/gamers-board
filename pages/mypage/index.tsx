import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { useQueryUser } from '../../hooks/useQueryUser';

const MyPage = () => {
  const { data: user } = useQueryUser();
  return (
    <Container>
      <Box></Box>
    </Container>
  );
};

export default MyPage;
