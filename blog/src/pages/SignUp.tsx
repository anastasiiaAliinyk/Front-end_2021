import styled from 'styled-components';
import React, { useState } from 'react';

import { TextField } from '../components/TextField';
import { SubmitButton } from '../components/SubmitButton';
import { useApi } from '../hooks/useApi';
import { Link } from 'react-router-dom';

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

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUpApi } = useApi();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // signUpApi(email, password, username)
    //   .then((response) => {
    //     console.log(response)
    //   })
  }

  return (
    <Main>
      <StyledFormContainer>
        <h3 className='form-heading'>
          Sign Up
        </h3>
        <form onSubmit={handleOnSubmit}>
          <label>
            Username:
            <TextField
              type='text'
              name='username'
              value={username}
              onChange={(e) => {setUsername((e.target as HTMLInputElement).value)}}
              placeholder='Username:'
            />
          </label>
          <label>
            Email:
            <TextField
              type='text'
              name='email'
              value={email}
              onChange={(e) => {setEmail((e.target as HTMLInputElement).value)}}
              placeholder='Email:'
            />
          </label>
          <label>
            Password:
            <TextField
              type='password'
              name='password'
              value={password}
              onChange={(e) => {setPassword((e.target as HTMLInputElement).value)}}
              placeholder='Password:'
            />
          </label>
          <SubmitButton label='Sign up' disabled={!email || !password || !username} />
        </form>
        <div>
          Already a member?
          <Link to='/login'>Log in</Link>
        </div>
      </StyledFormContainer>
    </Main>
  )
}
