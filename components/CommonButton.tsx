import React from 'react';
import { Button, SystemStyleObject } from '@chakra-ui/react';

type Props = {
  bg: string;
  color?: string;
  text: string;
  hover?: SystemStyleObject | undefined;
  clickAct: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disable?: boolean;
};

const CommonButton = ({ bg, color, text, hover, clickAct, disable }: Props) => {
  return (
    <>
      <Button
        bg={bg}
        color={color}
        _hover={hover}
        onClick={clickAct}
        isDisabled={disable}
      >
        {text}
      </Button>
    </>
  );
};

export default CommonButton;
