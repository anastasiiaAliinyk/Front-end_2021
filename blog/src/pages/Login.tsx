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

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginApi } = useApi();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    loginApi(email, password)
      .then((response) => {
        setEmail('');
        setPassword('');

        console.log(response)
      })
  }

  return (
    <Main>
      <StyledFormContainer>
        <h3 className='form-heading'>
          Log in
        </h3>
        <form onSubmit={handleOnSubmit}>
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
          <SubmitButton label='Log in' disabled={!email || !password} />
        </form>
        <div>
          Don’t have an account yet?
          <Link to='/signup'>Create an account</Link>
        </div>
      </StyledFormContainer>
    </Main>
  )
}
