import React, {useState} from 'react';
import styled from 'styled-components';
import { Container } from '../components/Container';
import { Avatar } from '../components/Avatar/Avatar';
import defaultPhotoAvatar from '../images/default-avatar.png';
import { Button } from '../components/Button/Button';
import {UserTabs} from "../components/UserTabs";
import {ArticleModal} from "../components/Modals/ArticleModal";
import {UserModal} from "../components/Modals/UserModal";
import {ArticleT} from "../types";

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

const user = {
  'id': '197028',
  'email': '112333@gmail.com',
  'createdAt': '2021-07-29T18:38:31.126Z',
  'updatedAt': '2021-08-19T15:09:09.641Z',
  'username': '112333',
  'bio': 'weweewew',
  'image': null,
  'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTk3MDI4LCJ1c2VybmFtZSI6IjExMjMzMyIsImV4cCI6MTYzNTkxODk2MH0.ZFvgioZV7vQiZbzwIsRrnTE_zBBohH7pt4_awXp_POE'
}
export const User: React.FC = () => {
  const [editUser, setEditUser] = useState(true);
  const handleOnCloseModal = () => {
    setEditUser(false);
  };

  return (
    <MainStyled>
      <Container>
        <UserBlockStyled>
          <HeaderTextStyled>
            <Avatar
              src={user.image || defaultPhotoAvatar}
              alt='User'
              size={80}
            />
            <div>
              <h3>{user.username}</h3>
              <p>{user.bio || 'No bio yet...'}</p>
            </div>
          </HeaderTextStyled>
          <ButtonStyled primary>
            Follow
          </ButtonStyled>
        </UserBlockStyled>
        <UserTabs username={user.username} />
        <UserModal
          user={user}
          modalIsOpen={editUser}
          onCloseModal={handleOnCloseModal}
        />
      </Container>
    </MainStyled>
  )
}
