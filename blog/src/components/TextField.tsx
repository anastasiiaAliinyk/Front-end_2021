import styled from 'styled-components';
import React from "react";

const StyledInput = styled.input`
  width: 100%;
  min-height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  
  border: 1px solid rgb(219, 223, 223);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: rgb(76, 175, 80);
  }
`

type InputProps = {
  type?: string
  name: string
  value?: string
  onChange?: (e: React.SyntheticEvent) => void
  placeholder?: string
}

export const TextField = (props: InputProps) => {
  const {
    type='text',
    name, value='',
    onChange=()=>{},
    placeholder=''
  } = props;

  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
