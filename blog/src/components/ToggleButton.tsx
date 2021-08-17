import styled from 'styled-components';

const StyledButton = styled.label`
  position: relative;
  width: 40px;
  height: 16px;
  display: inline-block;
  
  & > input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  & > input:focus + .slider {
    box-shadow: 0 0 1px #4a83b0;
  }

  & > input:checked + .slider:before {
    transform: translateX(21px);
  }

  & > .slider {
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
  }
`

export type ToggleButtonProps = {
  onChange: () => void
  checked: boolean
}

export const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <StyledButton>
      <input onChange={props.onChange} checked={props.checked} type='checkbox' />
      <span className='slider' />
    </StyledButton>
  )
}
