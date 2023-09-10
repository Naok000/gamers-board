import { Box, Center, Input } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = { setAction: Dispatch<SetStateAction<string>> };

const SearchBox = ({ setAction }: Props) => {
  return (
    <Box>
      <Center>
        <Input
          id='search'
          w='20rem'
          bg='lightblue'
          borderRadius='10px'
          border='1px'
          mt={5}
          placeholder='Enter Post Title'
          type='search'
          onChange={(e) => setAction(e.target.value)}
        />
      </Center>
    </Box>
  );
};
export default SearchBox;
