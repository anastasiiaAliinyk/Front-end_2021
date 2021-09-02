import styled from 'styled-components';
import { animationTime, textColorOnHover } from '../../constants';
import { Container } from '../Container';
import { NavLink } from 'react-router-dom';

export const HeaderStyled = styled.header`
  padding: 10px 0;
  background-color: ${props => props.theme.colors.secondaryBackground};
  transition: background-color ${animationTime} ease-out;
`

export const HeaderContainerStyled = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderLogoStyled = styled.span`
  display: block;
  width: 65px;
  height: 50px;
  
  background: url(${props => props.theme.logo}) no-repeat 50%;
  background-size: contain;
`

export const HeaderNavigationStyled = styled.nav`
  display: flex;
  align-items: center;
`

export const HeaderMenuStyled = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  
  & > li {
    position: relative;
    margin-right: 10px;
  }
`

export const HeaderLinkStyled = styled(NavLink)`
  padding: 10px;
  color: lightgray;
  text-decoration: none;
  transition: color ${animationTime} ease-in;

  &:hover {
    color: ${textColorOnHover};
  }
  
  &.active {
    color: ${props => props.theme.colors.text};
  }
`

export const HeaderButtonStyled = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: inherit;
  cursor: pointer;
  
  & > img {
    margin-right: 5px;
  }
`