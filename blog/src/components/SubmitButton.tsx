import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  min-height: 40px;
  margin-top: 10px;
  padding: 10px;

  color: #fff;
  background-color: rgb(76, 175, 80);
  border: none;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
  
  &:disabled {
    background-color: rgb(219, 223, 223);
    
    &:hover {
      cursor: not-allowed;
    }
  }
`
type SubmitButtonProps = {
  label: string
  disabled: boolean
}
export const SubmitButton = ({ label, disabled }: SubmitButtonProps) =>
  <StyledButton type='submit' disabled = {disabled}>
    {label}
  </StyledButton>
