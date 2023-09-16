import {
  Box,
  Flex,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react';
import { Posting } from '@prisma/client';
import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';

type Props = {
  post: Posting;
};

const OwnPostingItem = ({ post }: Props) => {
  return (
    <TableContainer>
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
  );
};

export default OwnPostingItem;
