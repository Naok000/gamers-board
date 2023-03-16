import { FormControl, Input, FormLabel, Stack } from '@chakra-ui/react';

export const BoardForm = () => {
  return (
    <Stack>
      <FormControl>
        <FormLabel>Posting Title</FormLabel>
        <Input type='text' placeholder='Enter a posting title' />
      </FormControl>
      <FormControl>
        <FormLabel>Posting Details</FormLabel>
        <Input type='text' placeholder='Enter a Details' />
      </FormControl>
    </Stack>
  );
};
