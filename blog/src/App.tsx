import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { useThemeMode } from './hooks/useThemeMode';
import { themes } from './constants';
import { AppContext } from './ context';
import { User } from './types';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { useEffect, useState } from "react";
import { useApi } from "./hooks/useApi";

export const App = () => {
  const [theme, toggleTheme] = useThemeMode();
  const {getUserApi} = useApi();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserApi()
      .then((response) => setUser(response.user))
      .catch(() => setUser(null))
  }, [])

  console.log(user)
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Router>
        <AppContext.Provider value={{user}}>
          <Header onThemeChange={toggleTheme} />
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/login'>
              <Login onUser={setUser} />
            </Route>
            <Route path='/signup'>
              <SignUp onUser={setUser} />
            </Route>
          </Switch>
          <Footer />
        </AppContext.Provider>
      </Router>
    </ThemeProvider>
  );
}
