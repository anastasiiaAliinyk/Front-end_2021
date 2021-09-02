import styled from 'styled-components';
import React, { useContext, useState } from 'react';

import { TextField } from '../components/TextField/TextField';
import { SubmitButton } from '../components/SubmitButton';
import { useApi } from '../hooks/useApi';
import { Link, Redirect } from 'react-router-dom';
import { AppContext } from '../ context';
import { User } from '../types';
import { CircularProgress } from '@material-ui/core';

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
type SignUpProps = {
  onUser: (user: User) => void
}

export const SignUp = ({ onUser }: SignUpProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AppContext);
  const {signUpApi} = useApi();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    signUpApi(email, password, username)
      .then((response) => {
        window.localStorage.setItem('token', response.user.token);
        setLoading(false);
        console.log(response.user);
        onUser(response.user);
      })
      .catch(() => {
        setUsername('');
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
        <div>
          Already a member?
          <Link to='/login'>Log in</Link>
        </div>
      </StyledFormContainer>
    </Main>
  )
}
