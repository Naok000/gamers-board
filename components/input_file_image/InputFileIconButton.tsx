import { IconButton, Input } from '@chakra-ui/react';
import React from 'react';

type Props = {
  name: string;
  label: string;
  changeAct: React.ChangeEventHandler<HTMLInputElement> | undefined;
  inputReference: React.LegacyRef<HTMLInputElement> | undefined;
  iconElement:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  clickAct: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const InputFileIconButton = ({
  name,
  label,
  changeAct,
  inputReference,
  iconElement,
  clickAct,
}: Props) => {
  return (
    <>
      <Input
        type='file'
        name={name}
        ref={inputReference}
        accept='image/*'
        hidden
        onChange={changeAct}
      />
      <IconButton aria-label={label} icon={iconElement} onClick={clickAct} />
    </>
  );
};

export default InputFileIconButton;
