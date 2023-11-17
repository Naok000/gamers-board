import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

type Props = {
  borderBottom?: string;
  borderColor?: string;
  src: string;
};

const Thumbnail = ({ borderBottom, borderColor, src }: Props) => {
  return (
    <Box
      h='auto'
      w='auto'
      borderBottom={borderBottom}
      borderColor={borderColor}
    >
      <Image
        alt='thumbnail'
        src={src}
        width='0'
        height='0'
        sizes='100vw'
        style={{ width: '100%', height: '160px' }}
        priority={true}
      />
    </Box>
  );
};

export default Thumbnail;
