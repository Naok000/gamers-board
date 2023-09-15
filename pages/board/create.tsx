import { useRouter } from 'next/router';
import {
  FormControl,
  Input,
  FormLabel,
  Stack,
  Select,
  Textarea,
  useColorModeValue,
  Flex,
  Box,
  HStack,
  FormHelperText,
} from '@chakra-ui/react';
import { useMutatePosting } from '../../hooks/useMutatePosting';
import { useState } from 'react';
import { Layout } from '../../components/Layout';
import { gameTitleLabel } from '../../consts/game_title/gameTitle';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { generateFileName } from '../../utils/generateFileName';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { hiddenInputFeature } from '../../components/input_file_image/hiddenInputFeature';
import InputFileIconButton from '../../components/input_file_image/InputFileIconButton';
import CommonButton from '../../components/CommonButton';
import Thumbnail from '../../components/board/Thumbnail';
import { useRecoilValue } from 'recoil';
import { currentUserId } from '../../recoil/boardState';

const CreatePosting = () => {
  const router = useRouter();
  const initPosting = {
    title: '',
    content: '',
    gameTitle: 'any title',
    imageURL: '',
  };
  const { createPostingMutation } = useMutatePosting();
  const sessionUserId = useRecoilValue(currentUserId)?.id;
  const [newPosting, setPosting] = useState(initPosting);
  const [postingThumbnail, setPostingThumbnail] = useState<File | null>(null);
  const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
  const { inputRef, onButtonClick, onChangeImageHandler } = hiddenInputFeature(
    setPostingThumbnail,
    setPreviewThumbnail
  );

  const addPosting = async () => {
    if (postingThumbnail) {
      const fileName = generateFileName(postingThumbnail.name);
      const storageRef = ref(storage, `images/${sessionUserId}/${fileName}`);

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

    setPosting(initPosting);
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
                <HStack>
                  <InputFileIconButton
                    name='thumbnail'
                    label='thumbnail'
                    inputReference={inputRef}
                    changeAct={onChangeImageHandler}
                    iconElement={<MdAddPhotoAlternate />}
                    clickAct={onButtonClick}
                  />
                  {previewThumbnail ? (
                    <Thumbnail height='160px' src={previewThumbnail} />
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
              <FormControl id='content'>
                <FormLabel>Posting Details</FormLabel>
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

              <CommonButton
                bg={'teal'}
                clickAct={() => addPosting()}
                text='Create Posting'
                disable={
                  !newPosting.gameTitle ||
                  newPosting.gameTitle === 'any title' ||
                  !newPosting.title
                }
              />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default CreatePosting;
