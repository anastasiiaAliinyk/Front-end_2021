import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTheme} from 'styled-components';
import {AppContext} from '../../ context';
import {ToggleButton} from '../ToggleButton/ToggleButton';
import {CustomTheme} from '../../types';
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
import {DropDown} from '../DropDownMenu/DropDown';
import {Avatar} from '../Avatar/Avatar';

type HeaderProps = {
  onThemeChange: () => void
  onLogout: () => void
}

export const Header: React.FC<HeaderProps> = ({onThemeChange, onLogout}) => {
  const theme = useTheme() as CustomTheme;
  const {user, isAuthorized} = useContext(AppContext);

  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);

  return (
    <HeaderStyled>
      <HeaderContainerStyled>
        <Link to='/'>
          <HeaderLogoStyled/>
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
            {isAuthorized &&
            <li>
              <HeaderButtonStyled onClick={() => setIsVisibleDropDown(!isVisibleDropDown)}>
                <Avatar
                  src={user!.image || defaultPhotoAvatar}
                  alt='user'
                />
                {user!.username}
              </HeaderButtonStyled>

              <DropDown
                isDropdownOpen={isVisibleDropDown}
                onClose={() => setIsVisibleDropDown(false)}
                onLogout={onLogout}
                username={user!.username}
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
  );
};
