import React from 'react';
import { Button, SystemStyleObject } from '@chakra-ui/react';

type Props = {
  bg?: string;
  size?: string;
  icon?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  color?: string;
  variant?: string;
  scheme?: string;
  text: string;
  hover?: SystemStyleObject | undefined;
  clickAct: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disable?: boolean;
};

const CommonButton = ({
  bg,
  color,
  variant,
  icon,
  size,
  scheme,
  text,
  hover,
  clickAct,
  disable,
}: Props) => {
  return (
    <>
      <Button
        bg={bg}
        size={size}
        variant={variant}
        leftIcon={icon}
        color={color}
        colorScheme={scheme}
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
