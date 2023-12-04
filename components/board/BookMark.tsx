import { Box, IconButton } from '@chakra-ui/react';
import React, { MouseEventHandler } from 'react';
import { GiBookmark, GiBookmarklet } from 'react-icons/gi';
import CommonButton from '../CommonButton';

type Props = {
  bookMarkId?: string;
  bookMarkAdd: MouseEventHandler<HTMLButtonElement> | undefined;
  bookMarkRemove: MouseEventHandler<HTMLButtonElement> | undefined;
};

const BookMark = ({ bookMarkId, bookMarkAdd, bookMarkRemove }: Props) => {
  return (
    <>
      {bookMarkId ? (
        <Box>
          <CommonButton icon={<GiBookmarklet />} clickAct={bookMarkRemove} />
        </Box>
      ) : (
        <>
          <Box>
            <CommonButton icon={<GiBookmark />} clickAct={bookMarkAdd} />
          </Box>
        </>
      )}
    </>
  );
};

export default BookMark;
