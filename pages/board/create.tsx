import { useRouter } from 'next/router';
import {
  FormControl,
  Input,
  FormLabel,
  Stack,
  Button,
  Select,
  Textarea,
  useColorModeValue,
  Flex,
  Box,
  IconButton,
  HStack,
  FormHelperText,
  Img,
} from '@chakra-ui/react';
import { useMutatePosting } from '../../hooks/useMutatePosting';
import { ChangeEvent, useRef, useState } from 'react';
import { Layout } from '../../components/Layout';
import { gameTitleLabel } from '../../consts/game_title/gameTitle';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { generateFileName } from '../../utils/generateFileName';
import { MdAddPhotoAlternate } from 'react-icons/md';

const CreatePosting = () => {
  const router = useRouter();
  const { createPostingMutation } = useMutatePosting();
  const [newPosting, setPosting] = useState({
    title: '',
    content: '',
    gameTitle: 'any title',
    imageURL: '',
  });
  const [postingThumbnail, setPostingThumbnail] = useState<File | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPostingThumbnail(e.target.files![0]);
      setPreviewThumbnail(URL.createObjectURL(e.target.files![0]));
      e.target.value = '';
    }
  };

  const addPosting = async () => {
    if (postingThumbnail) {
      const fileName = generateFileName(postingThumbnail.name);
      const storageRef = ref(storage, `images/${fileName}`);

      const uploadThumbnailImage = uploadBytesResumable(
        storageRef,
        postingThumbnail
      );
      uploadThumbnailImage.on(
        'state_changed',
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await getDownloadURL(storageRef).then(async (url) => {
            createPostingMutation.mutate({
              ...newPosting,
              imageURL: url,
              thumbnailFileName: fileName,
            });
          });
        }
      );
    } else {
      await getDownloadURL(
        ref(storage, `default_images/${newPosting.gameTitle}.jpg`)
      ).then(async (url) => {
        createPostingMutation.mutate({
          ...newPosting,
          imageURL: url,
          thumbnailFileName: `${newPosting.gameTitle}`,
        });
      });
    }

    setPosting({
      title: '',
      content: '',
      gameTitle: 'any title',
      imageURL: '',
    });
    URL.revokeObjectURL(previewThumbnail);
    setPreviewThumbnail('');
    setPostingThumbnail(null);
    router.push(`/board`);
  };

  return (
    <Layout title='Create Posting'>
      <Flex minH={'100vh'} align={'center'} justify={'center'}>
        <Stack
          spacing={8}
          mx={'auto'}
          w={{ base: 'sm', sm: 'lg', md: 'xl', xl: '3xl' }}
          py={10}
          px={6}
        >
          <Box
            w={{ base: 'none', sm: 'md', md: 'xl', lg: '2xl', xl: '3xl' }}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={5}>
              <FormControl id='thumbnail'>
                <FormLabel>Select Thumbnail</FormLabel>

                <Input
                  type='file'
                  name='file'
                  ref={inputRef}
                  accept='image/*'
                  hidden
                  onChange={onChangeImageHandler}
                />

                <HStack>
                  <IconButton
                    aria-label='thumbnail'
                    icon={<MdAddPhotoAlternate />}
                    onClick={onButtonClick}
                  />
                  {previewThumbnail ? (
                    <Box h='160px'>
                      <Img
                        alt='thumbnail'
                        src={previewThumbnail}
                        h='full'
                        w='full'
                        objectFit='cover'
                      />
                    </Box>
                  ) : (
                    <></>
                  )}
                </HStack>
                <FormHelperText>
                  If no image file is selected, the prepared thumbnail will be
                  used
                </FormHelperText>
              </FormControl>
              <FormControl id='gameTitle' isRequired>
                <FormLabel mt={2}>Game Title</FormLabel>
                <Select
                  bg='white'
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

              <FormControl id='title' isRequired>
                <FormLabel>Posting Title</FormLabel>
                <Input
                  bg='white'
                  type='text'
                  placeholder='Enter a posting title'
                  value={newPosting.title}
                  onChange={(e) =>
                    setPosting({ ...newPosting, title: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel id='content'>Posting Details</FormLabel>
                <Textarea
                  mr={4}
                  p={4}
                  placeholder='Enter a Details'
                  value={newPosting.content}
                  onChange={(e) =>
                    setPosting({ ...newPosting, content: e.target.value })
                  }
                />
              </FormControl>

              <Button
                isDisabled={!newPosting.gameTitle || !newPosting.title}
                colorScheme='teal'
                onClick={() => addPosting()}
              >
                Create Posting
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default CreatePosting;
