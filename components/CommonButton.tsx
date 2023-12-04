import React, { LegacyRef } from 'react';
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
  mx?: number;
  ml?: number;
  text?: string;
  hover?: SystemStyleObject | undefined;
  reference?: LegacyRef<HTMLButtonElement> | undefined;
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
  mx,
  ml,
  reference,
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
        mx={mx}
        ml={ml}
        variant={variant}
        leftIcon={icon}
        color={color}
        colorScheme={scheme}
        _hover={hover}
        ref={reference}
        onClick={clickAct}
        isDisabled={disable}
      >
        {text}
      </Button>
    </>
  );
};

export default CommonButton;
