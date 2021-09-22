import styled from 'styled-components';
import React, { useContext, useState } from 'react';

import { TextField } from '../components/TextField/TextField';
import { SubmitButton } from '../components/SubmitButton';
import { useApi } from '../hooks/useApi';
import { Link, Redirect } from 'react-router-dom';
import { AppContext } from '../ context';
import { UserT } from '../types';
import { CircularProgress } from '@material-ui/core';
import {useSnackbar} from "notistack";

const Main = styled.main`
  padding-bottom: 54px;
`

const StyledFormContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 50px auto;
  padding: 30px;

  line-height: 2rem;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;

  & > .form-heading {
    margin-bottom: 10px;
    font-size: 22px;
  }
`

const LinkStyled = styled(Link)`
  color: #37acee;
`

const LinkContainerStyled = styled.div`
  margin-top: 30px;
  text-align: center;
`

type SignUpProps = {
  onUser: (user: UserT) => void
  setIsAuthorized: (isSet: boolean) => void
}

export const SignUp = ({ onUser, setIsAuthorized }: SignUpProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const {signUpApi} = useApi();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    signUpApi(email, password, username)
      .then((user) => {
        window.localStorage.setItem('token', user.token);
        setLoading(false);
        onUser(user);
        setIsAuthorized(true);
      })
      .catch(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setLoading(false);
        enqueueSnackbar('Error...Problems with network', {
          variant: 'error',
          persist: true
        });
      })
  }

  return (
    <Main>
      {Boolean(user) && <Redirect to={'/'}/>}
      <StyledFormContainer>
        <h3 className='form-heading'>
          Sign Up
        </h3>
        <form onSubmit={handleOnSubmit}>
          <TextField
            labelText='Username:'
            type='text'
            name='username'
            value={username}
            onChange={(e) => {setUsername((e.target as HTMLInputElement).value)}}
            placeholder='Username:'
          />
          <TextField
            labelText='Email:'
            type='text'
            name='email'
            value={email}
            onChange={(e) => {setEmail((e.target as HTMLInputElement).value)}}
            placeholder='Email:'
          />
          <TextField
            labelText='Password:'
            type='password'
            name='password'
            value={password}
            onChange={(e) => {setPassword((e.target as HTMLInputElement).value)}}
            placeholder='Password:'
          />
          <SubmitButton disabled={!email || !password || !username || loading}>
            {loading ? <CircularProgress size='20px' /> : 'Sign up'}
          </SubmitButton>
        </form>
        <LinkContainerStyled>
          Already a member?
          <LinkStyled to='/login'> Log in</LinkStyled>
        </LinkContainerStyled>
      </StyledFormContainer>
    </Main>
  )
}
