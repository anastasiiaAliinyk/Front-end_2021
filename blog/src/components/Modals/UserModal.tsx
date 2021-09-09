import Modal from 'react-modal';
import React, { useContext, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

import { AppContext } from '../../ context';
import { TextField } from '../TextField/TextField';
import { SubmitButton } from '../SubmitButton';
import { useApi } from '../../hooks/useApi';
import { useRequestState } from '../../hooks/useRequestState';
import { UserT } from '../../types';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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
const UserModalStyled = styled(Modal)`
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
}

export const UserModal: React.FC<UserModalProps> = ({ modalIsOpen, onCloseModal }) => {
  const { user, isAuthorized, setUser } = useContext(AppContext);
  const history = useHistory();
  const [userName, setUserName] = useState(isAuthorized ? user!.username : '');
  const [bio, setBio] = useState(isAuthorized ? user!.bio : '');
  const [image, setImage] = useState(isAuthorized ? user!.image : '');
  const [email, setEmail] = useState(isAuthorized ? user!.email : '');
  const {updateUserApi} = useApi();
  const [isUpdateUserInProgress, setUpdateUser] = useRequestState<UserT>(updateUserApi);

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setUpdateUser({
      username: userName,
      bio,
      image,
      email
    })
      .then((updatedUser) => {
        if (setUser) {
          setUser({...user, ...updatedUser});
        }

        history.push(`/users/${userName}`);
        onCloseModal();
      });
  };

  return (
    <UserModalStyled
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={() => onCloseModal()}
    >
      <DivStyled>
        <h3>Edit User</h3>
        <CloseIconStyled onClick={onCloseModal} />
      </DivStyled>
      <form onSubmit={handleOnSubmit}>
        <TextField
          type='text'
          labelText='Username: '
          name='username'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='Username'
        />
        <TextField
          type='text'
          labelText='Image'
          name='image'
          value={image || ''}
          onChange={(e) => setImage(e.target.value)}
          placeholder='Image'
        />
        <TextField
          type='text'
          labelText='Bio'
          name='bio'
          value={bio || ''}
          onChange={(e) => setBio(e.target.value)}
          placeholder='Bio'
        />
        <TextField
          type='text'
          labelText='Email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <SubmitButton>
          {isUpdateUserInProgress ? <CircularProgress size='20px' /> : 'Update User'}
        </SubmitButton>
      </form>
    </UserModalStyled>
  );
};
