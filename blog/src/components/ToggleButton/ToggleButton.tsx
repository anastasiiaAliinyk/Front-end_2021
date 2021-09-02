import React from 'react';
import {
  InputStyled, 
  LabelStyled, 
  SpanStyled
} from './ToggleButton.styled';

export type ToggleButtonProps = {
  children: JSX.Element | string
  onChange: () => void
  checked: boolean
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ onChange, checked}) =>
  <LabelStyled>
    <InputStyled
      type='checkbox'
      onChange={onChange}
      checked={checked}
    />
    <SpanStyled />
  </LabelStyled>
