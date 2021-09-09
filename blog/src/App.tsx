import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { useThemeMode } from './hooks/useThemeMode';
import { themes } from './constants';
import { AppContext } from './ context';
import { UserT } from './types';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ArticlePage } from './pages/Article';

import { useApi } from './hooks/useApi';
import { User } from './pages/User';

export const App: React.FC = () => {
  const [theme, toggleTheme] = useThemeMode();

  const [user, setUser] = useState<UserT | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const { getUserApi } = useApi();

  useEffect(() => {
    getUserApi()
      .then(user => {
        setUser(user);
        setIsAuthorized(true);
      })
      .catch(() => setIsAuthorized(false));
  }, []);

  const onLogout = () => {
    setIsAuthorized(false);
    setUser(null);

    localStorage.setItem('token', '');
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle/>
      <Router>
        <AppContext.Provider value={{
          user,
          setUser,
          isAuthorized
        }}>
          <Header
            onThemeChange={toggleTheme}
            onLogout={onLogout}
          />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/login'>
              <Login onUser={setUser} setIsAuthorized={setIsAuthorized} />
            </Route>
            <Route path='/signup'>
              <SignUp onUser={setUser} setIsAuthorized={setIsAuthorized} />
            </Route>
            <Route path='/articles/:slug' component={ArticlePage} />
            <Route path='/users/:username' component={User} />
          </Switch>
          <Footer/>
        </AppContext.Provider>
      </Router>
    </ThemeProvider>
  );
};
