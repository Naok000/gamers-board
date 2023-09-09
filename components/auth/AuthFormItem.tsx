import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { HTMLInputTypeAttribute } from 'react';

type Props = {
  id: string;
  type: HTMLInputTypeAttribute | undefined;
  label: string;
  value: string | number | readonly string[] | undefined;
  changeAct: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const AuthFormItem = ({ id, type, label, value, changeAct }: Props) => {
  return (
    <FormControl id={id} isRequired>
      <FormLabel>{label}</FormLabel>
      <Input type={type} value={value} onChange={changeAct} required />
    </FormControl>
  );
};

export default AuthFormItem;
