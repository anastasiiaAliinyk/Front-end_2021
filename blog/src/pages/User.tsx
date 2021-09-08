import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { Container } from '../components/Container';
import { Avatar } from '../components/Avatar/Avatar';
import defaultPhotoAvatar from '../images/default-avatar.png';
import { Button } from '../components/Button/Button';
import {UserTabs} from "../components/UserTabs";
import {ArticleModal} from "../components/Modals/ArticleModal";
import {UserModal} from "../components/Modals/UserModal";
import {ArticleT, UserT} from "../types";
import {useApi} from "../hooks/useApi";
import {useParams} from "react-router-dom";
import {AppContext} from "../ context";

const MainStyled = styled.main`
  padding: 50px 0 54px;
`

const UserBlockStyled = styled.div`
  margin-bottom: 15px;
  padding: 25px;

  line-height: 1.5rem;
  border-radius: 5px;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
`;

const HeaderTextStyled = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const ButtonStyled = styled(Button)`
  color: red;
`

export const User: React.FC = () => {
  const [editUser, setEditUser] = useState(true);
  const [userProfile, setUserProfile] = useState<UserT | null>(null);
  const { username } = useParams<{ username: string }>();
  const { user } = useContext(AppContext);
  const {getUserProfileApi} = useApi();

  useEffect(() => {
    getUserProfileApi(username)
      .then(response => setUserProfile(response));
  }, [username]);

  const handleOnCloseModal = () => {
    setEditUser(false);
  };

  return (
    <MainStyled>
      <Container>
        <UserBlockStyled>
          <HeaderTextStyled>
            <Avatar
              src={userProfile && userProfile.image || defaultPhotoAvatar}
              alt='User'
              size={80}
            />
            <div>
              <h3>{userProfile && userProfile.username}</h3>
              <p>{userProfile && userProfile.bio || 'No bio yet...'}</p>
            </div>
          </HeaderTextStyled>
          <ButtonStyled primary>
            Follow
          </ButtonStyled>
        </UserBlockStyled>
        <UserTabs username={username} />
        <UserModal
          user={user}
          modalIsOpen={editUser}
          onCloseModal={handleOnCloseModal}
        />
      </Container>
    </MainStyled>
  )
}
