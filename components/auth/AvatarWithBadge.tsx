import { Avatar, AvatarBadge } from '@chakra-ui/react';
import React from 'react';

type Props = {
  src?: string | undefined;
  avatarBg?: string;
  badgeBg: string;
};

const AvatarWithBadge = ({ src, avatarBg, badgeBg }: Props) => {
  return (
    <>
      <Avatar src={src} bg={avatarBg}>
        <AvatarBadge boxSize='1.25rem' bg={badgeBg} />
      </Avatar>
    </>
  );
};

export default AvatarWithBadge;
