import { useRouter } from 'next/router';
import { FormControl, Input, FormLabel, Stack, Button } from '@chakra-ui/react';
import { useMutatePosting } from '../../hooks/useMutatePosting';
import { useState } from 'react';

const CreatePosting = () => {
  const { createPostingMutation } = useMutatePosting();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const addPosting = () => {
    createPostingMutation.mutate({ title, content });
    setTitle('');
    setContent('');
    router.push(`/board`);
  };
  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Posting Title</FormLabel>
        <Input
          type='text'
          placeholder='Enter a posting title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Posting Details</FormLabel>
        <Input
          type='text'
          placeholder='Enter a Details'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </FormControl>
      <Button onClick={() => addPosting()}>Create Posting</Button>
    </Stack>
  );
};

export default CreatePosting;
