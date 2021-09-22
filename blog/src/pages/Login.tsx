import styled from 'styled-components';
import React, { useContext, useState } from 'react';

import { TextField } from '../components/TextField/TextField';
import { SubmitButton } from '../components/SubmitButton';
import { useApi } from '../hooks/useApi';
import { Link, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { UserT } from '../types';
import { AppContext } from '../ context';
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

type LoginProps = {
  onUser: (user: UserT) => void
  setIsAuthorized: (isSet: boolean) => void
}

export const Login = ({ onUser, setIsAuthorized }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const { loginApi } = useApi();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    loginApi(email, password)
      .then((user) => {
        window.localStorage.setItem('token', user.token);
        setLoading(false)
        onUser(user);
        setIsAuthorized(true);
      })
      .catch(() => {
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
          Log in
        </h3>
        <form onSubmit={handleOnSubmit}>
          <TextField
            labelText='Email:'
            type='text'
            name='email'
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder='Email:'
          />
          <TextField
            labelText='Password:'
            type='password'
            name='password'
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            placeholder='Password:'
          />
          <SubmitButton disabled={!email || !password || loading}>
            {loading ? <CircularProgress size='20px' /> : 'Log in'}
          </SubmitButton>
        </form>
        <LinkContainerStyled>
          Don’t have an account yet?
          <LinkStyled to='/signup'> Create an account</LinkStyled>
        </LinkContainerStyled>
      </StyledFormContainer>
    </Main>
  )
}
