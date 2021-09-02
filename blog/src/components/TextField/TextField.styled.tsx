import styled from "styled-components";

export const InputStyled = styled.input`
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
