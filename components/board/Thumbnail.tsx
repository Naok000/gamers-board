import { Box, Img } from '@chakra-ui/react';
import React from 'react';

type Props = {
  height: string;
  borderBottom?: string;
  borderColor?: string;
  src?: string | undefined;
};

const Thumbnail = ({ height, borderBottom, borderColor, src }: Props) => {
  return (
    <Box h={height} borderBottom={borderBottom} borderColor={borderColor}>
      <Img alt='thumbnail' src={src} h='full' w='full' objectFit='cover' />
    </Box>
  );
};

export default Thumbnail;
