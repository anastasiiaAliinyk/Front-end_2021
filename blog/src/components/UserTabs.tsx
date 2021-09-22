import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Tab,
  Tabs as ReactTabs,
  TabList,
  TabPanel
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Articles } from './Articles/Articles';
import { Loader } from './Loader/Loader';
import { Pagination } from '@material-ui/lab';

import { ArticleT } from '../types';
import { ArticlesResponse } from '../api/articles';
import { useApi } from '../hooks/useApi';
import { useRequestState } from '../hooks/useRequestState';
import { usePaginatedRequest } from '../hooks/usePaginatedRequest';

type UserTabsProps = {
  username: string
}

export const UserTabs: React.FC<UserTabsProps> = ({username}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(1);
  const [articles, setArticles] = useState<ArticleT[]>([]);
  const [favoriteArticles, setFavoriteArticles] = useState<ArticleT[]>([]);
  const {getArticlesByAuthorApi, getFavoriteArticlesByAuthorApi} = useApi();

  const [favoriteArticlesInProgress, getFavoriteArticles] = useRequestState<ArticlesResponse>(getFavoriteArticlesByAuthorApi);
  const [articlesInProgress, getArticles] = useRequestState<ArticlesResponse>(getArticlesByAuthorApi);
  const {
    page: articlesPage,
    setPage: setArticlesPage,
    pages: articlesCountPages,
    doRequest: getPaginatedArticles
  } = usePaginatedRequest<ArticlesResponse>(getArticles, 'articlesCount');
  const {
    page: favoriteArticlesPage,
    setPage: setFavoriteArticlesPage,
    pages: favoriteArticlesCountPages,
    doRequest: getPaginatedFavoriteArticles
  } = usePaginatedRequest<ArticlesResponse>(getFavoriteArticles, 'articlesCount');

  const history = useHistory();

  useEffect(() => {
    getPaginatedArticles(username)
      .then((response) => setArticles(response.articles));
  }, [username, articlesPage]);

  useEffect(() => {
    getPaginatedFavoriteArticles(username)
      .then((response) => setFavoriteArticles(response.articles));
  }, [username, favoriteArticlesPage]);

  return (
    <ReactTabs
      selectedIndex={selectedTabIndex}
      onSelect={(tabIndex) => {
        history.push(`?active-tab=${tabIndex}`);
        setSelectedTabIndex(tabIndex);
      }}
    >
      <TabList>
        <Tab>
          My Posts
        </Tab>
        <Tab>
          Favorite Posts
        </Tab>
      </TabList>
      <TabPanel>
        {articlesInProgress
          ? <Loader primary />
          : <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Articles articles={articles} />
            {articles.length > 0 && <Pagination
              page={articlesPage}
              count={articlesCountPages}
              onChange={(e, page) => setArticlesPage(page)}
              variant='outlined'
              shape='rounded'
              style={{ alignSelf: 'center' }}
            />}
          </div>
        }
      </TabPanel>
      <TabPanel>
        {favoriteArticlesInProgress
          ? <Loader primary />
          : <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Articles articles={favoriteArticles} />
            {favoriteArticles.length > 0 && <Pagination
              page={favoriteArticlesPage}
              count={favoriteArticlesCountPages}
              onChange={(e, page) => setFavoriteArticlesPage(page)}
              variant='outlined'
              shape='rounded'
              style={{ alignSelf: 'center' }}
            />}
          </div>
        }
      </TabPanel>
    </ReactTabs>
  )
}
