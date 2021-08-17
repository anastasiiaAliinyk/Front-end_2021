import styled from 'styled-components';
import { Container } from './Container';
import { animationTime } from '../constants';

const StyledFooter = styled.footer`
  
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-top: 1px solid rgb(219, 223, 223);
  transition: background-color ${animationTime} ease-out, color ${animationTime} ease-out;
`

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > .footer-main-content {
    display: flex;
    align-items: center;
  }
`

const FooterLogo = styled.span`
  display: inline-block;
  margin-right: 10px;
  width: 30px;
  height: 30px;

  background: url(${props => props.theme.logo}) no-repeat 50%;
  background-size: contain;
`

export const Footer= () =>
  <StyledFooter>
    <StyledContainer>
      <div className='footer-main-content'>
        <a href='/'>
          <FooterLogo />
        </a>
        © 2021. An interactive learning project
      </div>
      <div>
        Developed 2021
      </div>
    </StyledContainer>
  </StyledFooter>
