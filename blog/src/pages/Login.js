import styled from 'styled-components';
import { useState } from 'react';

import { TextField } from '../components/TextField';
import { SubmitButton } from '../components/SubmitButton';
import { useApi } from '../hooks/useApi';
import { Link } from 'react-router-dom';

const Main = styled.main`
  height: 100%;
  min-height: 100%;
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

  const handleOnSubmit = (e) => {
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
              onChange={(e) => {setEmail(e.target.value)}}
              placeholder='Email:'
            />
          </label>
          <label>
            Password:
            <TextField
              type='password'
              name='password'
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
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


// import { useState } from 'react';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
// import { useApi } from '../hooks/useApi';
// import Grid from '@material-ui/core/Grid';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import Typography from '@material-ui/core/Typography';
//
// const StyledLoginContainer = styled(Container)`
//   margin: 50px 0;
//   padding: 20px 40px;
//   box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
// `
// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { loginApi } = useApi();
//
//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//
//     loginApi(email, password)
//       .then(console.log)
//   }
//
//   return (
//     <StyledLoginContainer component='main' maxWidth='sm'>
//       <CssBaseline />
//       <div>
//         <Typography component='h1' variant='h5'>
//           Sign in
//         </Typography>
//         <form onSubmit={handleOnSubmit}>
//           <TextField
//             value={email}
//             variant='outlined'
//             margin='normal'
//             required
//             fullWidth
//             id='email'
//             label='Email Address'
//             name='email'
//             autoComplete='email'
//             autoFocus
//             onChange={(e) => {setEmail(e.target.value)}}
//           />
//           <TextField
//             value={password}
//             variant='outlined'
//             margin='normal'
//             required
//             fullWidth
//             name='password'
//             label='Password'
//             type='password'
//             id='password'
//             autoComplete='current-password'
//             onChange={(e) => {setPassword(e.target.value)}}
//           />
//           <Button
//             dissabled={true}
//             type='submit'
//             fullWidth
//             variant='contained'
//             color='primary'
//           >
//             Sign In
//           </Button>
//           <Grid container justifyContent='center'>
//             <Grid item>
//               <span>Don’t have an account yet? </span>
//               <Link to='/signup'>
//                  Create an account
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//     </StyledLoginContainer>
//   );
// }
