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
  // false value when user is not authorized
  const [user, setUser] = useState<UserT | null | boolean>(null);
  const { getUserApi } = useApi();

  useEffect(() => {
    getUserApi()
      .then(setUser)
      .catch(() => setUser(false));
  }, []);

  const onLogout = () => {
    setUser(false);
    localStorage.setItem('token', '');
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle/>
      <Router>
        <AppContext.Provider value={{ user }}>
          <Header
            onThemeChange={toggleTheme}
            onLogout={onLogout}
          />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/login'>
              <Login onUser={setUser}/>
            </Route>
            <Route path='/signup'>
              <SignUp onUser={setUser}/>
            </Route>
            <Route path='/articles/:slug' component={ArticlePage}/>
            <Route path='/users/' component={User} />
          </Switch>
          <Footer/>
        </AppContext.Provider>
      </Router>
    </ThemeProvider>
  );
};
