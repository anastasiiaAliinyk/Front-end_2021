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

import { useState } from "react";

export const App = () => {
  const [theme, toggleTheme] = useThemeMode();
  const [authorizedUser, setAuthorizedUser] = useState<User | null>(null);

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Router>
        <AppContext.Provider value={{authorizedUser}}>
          <Header onThemeChange={toggleTheme} />
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/login'>
              <Login onUser={setAuthorizedUser} />
            </Route>
            <Route path='/signup'>
              <SignUp onUser={setAuthorizedUser} />
            </Route>
          </Switch>
          <Footer />
        </AppContext.Provider>
      </Router>
    </ThemeProvider>
  );
}
