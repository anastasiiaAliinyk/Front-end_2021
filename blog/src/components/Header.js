import styled, { useTheme } from 'styled-components';
import { Container } from './Container';
import { animationTime, textColorOnHover } from '../constants';
import { ToggleButton } from './ToggleButton';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  padding: 10px 0;
  background-color: ${props => props.theme.colors.secondaryBackground};
  transition: background-color ${animationTime} ease-out;
`

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderLogo = styled.span`
  display: block;
  width: 65px;
  height: 50px;
  
  background: url(${props => props.theme.logo}) no-repeat 50%;
  background-size: contain;
`

const HeaderNavigation = styled.nav`
  display: flex;
  align-items: center;
`

const HeaderMenu = styled.ul`
  display: flex;
  list-style: none;

  & > li > a {
    padding: 10px;
    color: ${props => props.theme.colors.text};
    text-decoration: none;
    transition: color ${animationTime} ease-in;

    &:hover {
      color: ${textColorOnHover};
    }
  }
`

export const Header = ({ onThemeChange }) => {
  const theme = useTheme();

  return (
    <StyledHeader>
      <HeaderContainer>
        <a href='/'>
          <HeaderLogo />
        </a>
        <HeaderNavigation>
          <HeaderMenu>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login">
                Log in
              </Link>
            </li>
            <li>
              <Link to='/signup'>
                Sign up
              </Link>
            </li>
          </HeaderMenu>
          <ToggleButton onChange={onThemeChange} checked={theme.title === 'dark'}>
            Change
          </ToggleButton>
        </HeaderNavigation>
      </HeaderContainer>
    </StyledHeader>
  )
}
