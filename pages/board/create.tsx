import { useRouter } from 'next/router';
import {
  FormControl,
  Input,
  FormLabel,
  Stack,
  Button,
  Select,
} from '@chakra-ui/react';
import { useMutatePosting } from '../../hooks/useMutatePosting';
import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { gameTitleLabel } from './game_title/gameTitle';

const CreatePosting = () => {
  const { createPostingMutation } = useMutatePosting();
  const [newPosting, setPosting] = useState({
    title: '',
    content: '',
    gameTitle: 'any title',
  });
  const router = useRouter();

  const addPosting = () => {
    createPostingMutation.mutate({ ...newPosting });
    setPosting({ title: '', content: '', gameTitle: 'any title' });
    router.push(`/board`);
  };

  return (
    <Layout title='Create Posting'>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Posting Title</FormLabel>
          <Input
            type='text'
            placeholder='Enter a posting title'
            value={newPosting.title}
            onChange={(e) =>
              setPosting({ ...newPosting, title: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Posting Details</FormLabel>
          <Input
            type='text'
            placeholder='Enter a Details'
            value={newPosting.content}
            onChange={(e) =>
              setPosting({ ...newPosting, content: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Game Title</FormLabel>
          <Select
            value={newPosting.gameTitle}
            onChange={(e) =>
              setPosting({ ...newPosting, gameTitle: e.target.value })
            }
          >
            {gameTitleLabel.map((data, index) => (
              <option key={index} value={data.value}>
                {data.gameTitle}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => addPosting()}>Create Posting</Button>
      </Stack>
    </Layout>
  );
};

export default CreatePosting;
