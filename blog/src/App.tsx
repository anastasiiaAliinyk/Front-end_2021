import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { useThemeMode } from './hooks/useThemeMode';
import { themes } from './constants';
import { AppContext } from './ context';
import { User } from './types';

import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ArticlePage } from './pages/Article';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { useApi } from './hooks/useApi';

export const App: React.FC = () => {
  const [theme, toggleTheme] = useThemeMode();
  const {getUserApi} = useApi();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserApi()
      .then((response) => setUser(response.user))
      .catch(() => setUser(null))
  }, [])

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Router>
        <AppContext.Provider value={{user}}>
          <Header onThemeChange={toggleTheme} />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login'>
              <Login onUser={setUser} />
            </Route>
            <Route path='/signup'>
              <SignUp onUser={setUser} />
            </Route>
            <Route path='/articles/:slug' component={ArticlePage} />
          </Switch>
          <Footer />
        </AppContext.Provider>
      </Router>
    </ThemeProvider>
  );
}
