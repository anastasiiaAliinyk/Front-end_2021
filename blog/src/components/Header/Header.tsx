import React, {useContext, useState} from 'react';
import { AppContext } from '../../ context';
import { useTheme } from 'styled-components';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { CustomTheme } from '../../types';
import { Link } from 'react-router-dom';

import {
  HeaderContainerStyled,
  HeaderLinkStyled,
  HeaderLogoStyled,
  HeaderMenuStyled,
  HeaderNavigationStyled,
  HeaderStyled,
  HeaderButtonStyled
} from './Header.styled';

import defaultPhotoAvatar from '../../images/default-avatar.png';
import { DropDown } from '../DropDownMenu/DropDown';

type HeaderProps = {
  onThemeChange: () => void
}

export const Header: React.FC<HeaderProps> = ({ onThemeChange }) => {
  const theme = useTheme() as CustomTheme;
  const {user} = useContext(AppContext);
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);

  return (
    <HeaderStyled>
      <HeaderContainerStyled>
        <Link to='/'>
          <HeaderLogoStyled />
        </Link>
        <HeaderNavigationStyled>
          <HeaderMenuStyled>
            <li>
              <HeaderLinkStyled to='/' exact>
                Home
              </HeaderLinkStyled>
            </li>
            {!user &&
              <>
                <li>
                  <HeaderLinkStyled to='/login'>
                    Log in
                  </HeaderLinkStyled>
                </li>
                <li>
                  <HeaderLinkStyled to='/signup'>
                    Sign up
                  </HeaderLinkStyled>
                </li>
              </>
            }
            {user &&
              <li>
                <HeaderButtonStyled onClick={() => setIsVisibleDropDown(!isVisibleDropDown)}>
                  <img style={{ width: 25 }} height={25} src={user.image || defaultPhotoAvatar} alt='user'/>
                  {user.username}
                </HeaderButtonStyled>
                <DropDown
                  isDropdownOpen={isVisibleDropDown}
                  onClose={() => setIsVisibleDropDown(false)}
                />
              </li>
            }
          </HeaderMenuStyled>
          <ToggleButton onChange={onThemeChange} checked={theme.title === 'dark'}>
            Change
          </ToggleButton>
        </HeaderNavigationStyled>
      </HeaderContainerStyled>
    </HeaderStyled>
  )
}
