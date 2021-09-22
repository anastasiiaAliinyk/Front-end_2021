import React, { useContext, useEffect, useState } from 'react';
import {
  MainStyled,
  UserBlockStyled,
  HeaderTextStyled,
  ButtonStyled
} from './User.styled';
import { Container } from '../../components/Container';
import { Avatar } from '../../components/Avatar/Avatar';
import { Loader } from '../../components/Loader/Loader';
import { UserTabs } from '../../components/UserTabs';
import { UserModal } from '../../components/Modals/UserModal';
import defaultPhotoAvatar from '../../images/default-avatar.png';

import { UserT } from '../../types';
import { useApi } from '../../hooks/useApi';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../ context';
import { useRequestState } from '../../hooks/useRequestState';

export const User: React.FC = () => {
  const [editUser, setEditUser] = useState(false);
  const [userProfile, setUserProfile] = useState<UserT | null>(null);
  const {username} = useParams<{ username: string }>();
  const {user, isAuthorized} = useContext(AppContext);
  const {getUserProfileApi} = useApi();
  const [userProfileInProgress, getUserProfile] = useRequestState<UserT>(getUserProfileApi);

  useEffect(() => {
    getUserProfile(username)
      .then(response => setUserProfile(response));
  }, [username, user]);

  const handleOnCloseModal = () => {
    setEditUser(false);
  };

  return (
    <MainStyled>
      <Container>
        {userProfileInProgress === null || userProfileInProgress
          ? <Loader primary count={1}/>
          : (
            userProfile ? <>
              <UserBlockStyled>
                <HeaderTextStyled>
                  <Avatar
                    src={userProfile.image || defaultPhotoAvatar}
                    alt='User'
                    size={80}
                  />
                  <div>
                    <h3>{userProfile.username}</h3>
                    <p>{userProfile.bio || 'No bio yet...'}</p>
                  </div>
                </HeaderTextStyled>
                {isAuthorized && user!.username === username
                  ? <ButtonStyled onClick={() => setEditUser(true)} primary>
                    Edit
                  </ButtonStyled>
                  : <ButtonStyled primary>
                    Follow
                  </ButtonStyled>
                }
              </UserBlockStyled>
              <UserTabs username={username}/>
            </> : <>Loading Error</>
          )
        }
        <UserModal
          modalIsOpen={editUser}
          onCloseModal={handleOnCloseModal}
        />
      </Container>
    </MainStyled>
  )
}
