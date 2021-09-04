import styled from 'styled-components';
import React, { useContext, useState } from 'react';

import { TextField } from '../components/TextField/TextField';
import { SubmitButton } from '../components/SubmitButton';
import { useApi } from '../hooks/useApi';
import { Link, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { UserT } from '../types';
import { AppContext } from '../ context';

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
type LoginProps = {
  onUser: (user: UserT) => void
}

export const Login = ({ onUser }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AppContext);
  const { loginApi } = useApi();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    loginApi(email, password)
      .then((response) => {
        window.localStorage.setItem('token', response.user.token);
        setLoading(false)
        onUser(response.user);
      })
      .catch(() => {
        setEmail('');
        setPassword('');
        alert('Problems with server. Try latter')
        setLoading(false)
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
        <div>
          Don’t have an account yet?
          <Link to='/signup'>Create an account</Link>
        </div>
      </StyledFormContainer>
    </Main>
  )
}
