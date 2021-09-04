import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../../ context';
import {
  Tab,
  Tabs as ReactTabs,
  TabList,
  TabPanel
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Loader } from '../Loader';
import { Articles } from '../Articles/Articles';
import { ArticleT } from '../../types';
import { useApi } from '../../hooks/useApi';
import { useSnackbar } from 'notistack';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type HomeTabsProps = {
  iaLoadedByTags: boolean
  articlesByTag: ArticleT[]
  selectedTag?: string
  setSelectedTag: (tag: string) => void
}

export const HomeTabs: React.FC<HomeTabsProps> = (
  {
    iaLoadedByTags,
    articlesByTag,
    selectedTag = '', 
    setSelectedTag 
  }) => {
  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const { user } = useContext(AppContext);
  const [articles, setArticles] = useState<ArticleT[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userFeeds, setUserFeeds] = useState<ArticleT[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);
  const {enqueueSnackbar} = useSnackbar();
  const {getFeedsApi, getArticlesApi} = useApi();

  useEffect(() => {
    if (!enqueueSnackbar) return;

    getArticlesApi()
      .then(data => setArticles(data.articles))
      .catch(() => {
        enqueueSnackbar('Error loading Articles', {
          variant: 'error',
          persist: true,
        })
      })
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (user) {
      getFeedsApi()
        .then(data => setUserFeeds(data.articles))
    }
  }, [user]);

  useEffect(() => {
    let activeTab = query.get('active-tab');
    if (activeTab) {
      setSelectedTabIndex(+activeTab)
    }

    if (activeTab && +activeTab === 0) {
      if (!user) {
        history.push('/login');
        return;
      }
    }
    const tag = query.get('tag');
    setSelectedTag(tag || '');
  }, [location]);

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
        {!isLoaded && <Loader primary />}
        <Articles isLoaded={isLoaded} articles={userFeeds} />
      </TabPanel>
      <TabPanel>
        {!isLoaded && <Loader primary />}
        <Articles isLoaded={isLoaded} articles={articles} />
      </TabPanel>
      <TabPanel>
        {!iaLoadedByTags && <Loader primary />}
        <Articles isLoaded={iaLoadedByTags} articles={articlesByTag} />
      </TabPanel>
    </ReactTabs>
  )
}
