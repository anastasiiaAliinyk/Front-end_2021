import styled, { css } from 'styled-components';

export const ButtonStyled = styled.button`
  padding: 5px;
  cursor: pointer;
  color: rgb(34, 107, 224);
  outline: none;
  background-color: inherit;
  border: none;
  ${(props: { primary?: boolean } ) => props.primary && css`
    color: rgb(76, 175, 80);
    border: 1px solid rgb(76, 175, 80);
    border-radius: 3px;
    
    &:hover {
      color: white;
      background-color: rgb(76, 175, 80);
    }
  `}
`