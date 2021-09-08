import Modal from 'react-modal';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '../TextField/TextField';
import { SubmitButton } from '../SubmitButton';
import CloseIcon from '@material-ui/icons/Close';

import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import {UserT} from "../../types";
// import { useApi } from '../../hooks/useApi';
// import { ArticleT } from '../../types';
// import { useRequestState } from '../../hooks/useRequestState';

const CloseIconStyled = styled(CloseIcon)`
  cursor: pointer;

  &:hover {
    background-color: rgba(198, 202, 238, 0.5);
    border-radius: 50%;
  }
`;
const DivStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ArticleModalStyled = styled(Modal)`
  max-width: 600px;
  width: 100%;
  margin: 50px auto;
  padding: 30px;

  line-height: 2rem;
  background-color: white;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
  
  &:focus {
    outline: none;
  }
`;

type UserModalProps = {
  modalIsOpen: boolean
  onCloseModal: () => void
  user?: UserT | null | boolean
}

export const UserModal: React.FC<UserModalProps> = ({ modalIsOpen, onCloseModal, user }) => {
  const history = useHistory();
  // const { createArticleApi, updateArticleApi } = useApi();

  const [userName, setUserName] = useState(typeof user === 'object' && user ? user.username : '');
  const [bio, setBio] = useState(typeof user === 'object' && user ? user.bio : '');
  const [image, setImage] = useState(typeof user === 'object' && user ? user.image : '');
  const [email, setEmail] = useState(typeof user === 'object' && user ? user.email : '');

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <ArticleModalStyled
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={() => onCloseModal()}
    >
      <DivStyled>
        <h3>Edit User</h3>
        <CloseIconStyled onClick={() => onCloseModal()}/>
      </DivStyled>
      <form onSubmit={handleOnSubmit}>
        <TextField
          type="text"
          labelText="Username: "
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <TextField
          type="text"
          labelText="Image"
          name="image"
          value={image || ''}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image"
        />
        <TextField
          type="text"
          labelText="Bio"
          name="bio"
          value={bio || ''}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
        <TextField
          type="text"
          labelText="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <SubmitButton>
          Update User
        </SubmitButton>
      </form>
    </ArticleModalStyled>
  );
};
