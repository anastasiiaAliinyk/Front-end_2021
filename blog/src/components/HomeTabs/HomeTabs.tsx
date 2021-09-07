import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Tab,
  Tabs as ReactTabs,
  TabList,
  TabPanel
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Pagination } from '@material-ui/lab';
import { AppContext } from '../../ context';
import { Loader } from '../Loader/Loader';
import { Articles } from '../Articles/Articles';
import { ArticleT } from '../../types';
import { useApi } from '../../hooks/useApi';
import { useRequestState } from '../../hooks/useRequestState';
import { usePaginatedRequest } from '../../hooks/usePaginatedRequest';
import { ArticlesResponse } from '../../api/articles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type HomeTabsProps = {
  selectedTag?: string
  setSelectedTag: (tag: string) => void
}

export const HomeTabs: React.FC<HomeTabsProps> = (
  {
    selectedTag = '',
    setSelectedTag
  }) => {

  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useContext(AppContext);
  const [articles, setArticles] = useState<ArticleT[]>([]);
  const [feeds, setFeeds] = useState<ArticleT[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | null>(null);
  const [articlesByTag, setArticlesByTag] = useState<ArticleT[]>([]);

  const { getFeedsApi, getArticlesApi, getArticlesByTagApi } = useApi();
  const [getArticlesInProgress, getArticles] = useRequestState<ArticlesResponse>(getArticlesApi);
  const {
    page: articlesPage,
    setPage: setArticlesPage,
    pages: articlesCountPages,
    doRequest: getPaginatedArticles
  } = usePaginatedRequest<ArticlesResponse>(getArticles, 'articlesCount');

  const [getFeedsInProgress, getFeeds] = useRequestState<ArticlesResponse>(getFeedsApi);
  const {
    page: feedsPage,
    setPage: setFeedsPage,
    pages: feedsCountPages,
    doRequest: getPaginatedFeeds
  } = usePaginatedRequest<ArticlesResponse>(getFeeds, 'articlesCount');

  const [getArticlesByTagInProgress, getArticlesByTag] = useRequestState<ArticlesResponse>(getArticlesByTagApi);
  const {
    page: articlesByTagPage,
    setPage: setArticlesByTagPage,
    pages: articlesByTagCountPages,
    doRequest: getPaginatedArticlesByTag
  } = usePaginatedRequest<ArticlesResponse>(getArticlesByTag, 'articlesCount');

  useEffect(() => {
    if (user === null || selectedTabIndex === null || selectedTabIndex !== 0) {
      return;
    }
    if (!user) {
      // when a user is not authorized
      history.push('/login');
      return;
    }
    getPaginatedFeeds()
      .then(({ articles }) => setFeeds(articles));

  }, [user, selectedTabIndex, feedsPage]);

  useEffect(() => {
    if (selectedTabIndex === null || selectedTabIndex !== 1) {
      return;
    }
    getPaginatedArticles()
      .then(({ articles }) => setArticles(articles))
      .catch(() => {
        enqueueSnackbar('Error loading Articles', {
          variant: 'error',
          persist: true
        });
      });
  }, [selectedTabIndex, articlesPage]);

  useEffect(() => {
    if (selectedTabIndex === null || selectedTabIndex !== 2 || !selectedTag) {
      return;
    }
    getPaginatedArticlesByTag(selectedTag)
      .then(({ articles }) => setArticlesByTag(articles));

  }, [selectedTabIndex, selectedTag, articlesByTagPage]);

  useEffect(() => {
    if (user === null) {
      // a user was not loaded yet
      return;
    }
    let rawActiveTab = query.get('active-tab');
    const activeTab = rawActiveTab ? +rawActiveTab : 1;
    setSelectedTabIndex(activeTab);

    const tag = query.get('tag');
    setSelectedTag(tag || '');
  }, [user, location]);

  if (selectedTabIndex === null) {
    // user loading in progress
    return <Loader primary />;
  }

  return (
    <ReactTabs
      selectedIndex={selectedTabIndex}
      onSelect={(tabIndex) => {
        history.push(`?active-tab=${tabIndex}`);
      }}
    >
      <TabList>
        <Tab>
          Your Feeds
        </Tab>
        <Tab>
          Global Feeds
        </Tab>
        <Tab>
          {selectedTag}
        </Tab>
      </TabList>
      <TabPanel>
        {(
          getFeedsInProgress === null || getFeedsInProgress
        ) ? <Loader primary/> : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Articles articles={feeds} />
            <Pagination
              page={feedsPage}
              count={feedsCountPages}
              onChange={(e, page) => setFeedsPage(page)}
              variant='outlined'
              shape='rounded'
              style={{ alignSelf: 'center' }}
            />
          </div>
        )}
      </TabPanel>
      <TabPanel>
        {(
          getArticlesInProgress === null || getArticlesInProgress
        ) ? <Loader primary/> : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Articles articles={articles}/>
            <Pagination
              page={articlesPage}
              count={articlesCountPages}
              onChange={(e, page) => setArticlesPage(page)}
              variant='outlined'
              shape='rounded'
              style={{ alignSelf: 'center' }}
            />
          </div>
        )}
      </TabPanel>
      <TabPanel>
        {(
          getArticlesByTagInProgress === null || getArticlesByTagInProgress
        ) ? <Loader primary/> : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Articles articles={articlesByTag}/>
            <Pagination
              page={articlesByTagPage}
              count={articlesByTagCountPages}
              onChange={(e, page) => setArticlesByTagPage(page)}
              variant='outlined'
              shape='rounded'
              style={{ alignSelf: 'center' }}
            />
          </div>
        )}
      </TabPanel>
    </ReactTabs>
  );
};
