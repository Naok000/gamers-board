import {
  Box,
  Button,
  FormControl,
  HStack,
  Spacer,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { MdClose, MdOutlinePostAdd } from 'react-icons/md';

type Props = {
  comment: string;
  changeAct: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  closeAct: React.MouseEventHandler<HTMLButtonElement> | undefined;
  postAct: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const CommentForm = ({ comment, changeAct, closeAct, postAct }: Props) => {
  return (
    <Stack bg='white' mt={2} p={2} borderRadius='lg'>
      <FormControl id='comment'>
        <Box>
          <Textarea
            name='comment'
            placeholder='Enter new comment...'
            value={comment}
            onChange={changeAct}
          />
        </Box>
      </FormControl>
      <HStack>
        <Spacer />
        <Button
          leftIcon={<MdOutlinePostAdd />}
          isDisabled={!comment}
          type='submit'
          colorScheme='teal'
          onClick={postAct}
        >
          post
        </Button>
        <Button leftIcon={<MdClose />} onClick={closeAct}>
          Close
        </Button>
      </HStack>
    </Stack>
  );
};

export default CommentForm;
