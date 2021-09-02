import React from 'react';
import { InputStyled } from './TextField.styled';

type InputProps = {
  type: string
  labelText: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export const TextField: React.FC<InputProps> = (props) => {
  const {
    type,
    labelText,
    name,
    value,
    onChange,
    placeholder=''
  } = props;

  return (
    <label>
      {labelText}
      <InputStyled
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  )
}
