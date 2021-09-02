import styled from 'styled-components';

export const LabelStyled = styled.label`
  position: relative;
  width: 40px;
  height: 16px;
  display: inline-block;
`

export const InputStyled = styled.input`
  width: 0;
  height: 0;
  opacity: 0;

  &:focus + span {
    box-shadow: 0 0 1px #4a83b0;
  }

  &:checked + span:before {
    transform: translateX(21px);
  }
`

export const SpanStyled = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  cursor: pointer;
  background-color: rgb(221, 226, 227);
  border-radius: 34px;
  transition: all 0.4s;

  &:before {
    position: absolute;
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 1px;

    content: '';
    background-color: #678ae2;
    transition: all 0.4s;
    border-radius: 50%;
  }
`
