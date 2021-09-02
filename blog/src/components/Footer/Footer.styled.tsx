import styled from 'styled-components';
import { animationTime } from '../../constants';
import { Container } from '../Container';

export const FooterStyled = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  height: 54px;
  
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-top: 1px solid rgb(219, 223, 223);
  transition: background-color ${animationTime} ease-out, color ${animationTime} ease-out;
`

export const FooterContainerStyled = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FooterMainContentStyled = styled.div`
  display: flex;
  align-items: center;
`

export const FooterLogoStyled = styled.span`
  display: inline-block;
  margin-right: 10px;
  width: 30px;
  height: 30px;

  background: url(${props => props.theme.logo}) no-repeat 50%;
  background-size: contain;
`