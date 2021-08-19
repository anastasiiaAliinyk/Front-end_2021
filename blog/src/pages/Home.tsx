import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import { Container } from '../components/Container';
import { Hero } from '../components/Hero';
import { Tabs } from '../components/Tabs';
import { Post } from '../components/Post';

import { useApi } from '../hooks/useApi';
import { Article, Tag } from '../types';

const Main = styled.main`
  padding-bottom: 54px
`
const StyledContainer = styled(Container)`
  display: flex;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const MainContent = styled.div`
  width: 100%;
  margin-right: 20px;

  @media (max-width: 768px) {
    order: 2;
  }
`

const Aside = styled.aside`
  max-width: 250px;
  width: 100%;
  height: max-content;
  padding: 10px;

  line-height: 1.5rem;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
  border-radius: 5px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 20px;
    order: 1;
  }
`

export const Home = () => {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null);
  // const [selectedTag, setSelectedTag] = useState<string>('');

  const { enqueueSnackbar } = useSnackbar();
  const { getArticlesApi, getTagsApi } = useApi();

  useEffect(() => {
    if (!enqueueSnackbar) return;

    getArticlesApi()
      .then(data => setArticles(data.articles))
      .catch(() => {
          enqueueSnackbar('Error loading Articles', {
            variant: 'error',
            persist: true,
          });
          setArticles([]);
      });

    getTagsApi()
      .then(data => setTags(data.tags))
      .catch(() => {
        enqueueSnackbar('Error loading Tags', {
          variant: 'error',
          persist: true,
        });
      });
  }, []);

  return (
    <Main>
      <Hero />
      <StyledContainer>
        <MainContent>
          <Tabs tabs={['Your Feeds', 'Global Feeds']}>
            <div>
              Your Feeds
            </div>
            <div>
              {articles === null && (
                <>
                  <Skeleton style={{ marginBottom: 15 }} height={150} />
                  <Skeleton style={{ marginBottom: 15 }} height={150} />
                  <Skeleton style={{ marginBottom: 15 }} height={150} />
                  <Skeleton style={{ marginBottom: 15 }} height={150} />
                  <Skeleton style={{ marginBottom: 15 }} height={150} />
                </>
              )}
              {articles && articles.map(article => (
                <Post
                  key={article.slug}
                  article={article}
                />
              ))}
              {articles !== null && !articles.length && <p>No articles yet</p>}
            </div>
          </Tabs>
        </MainContent>
        <Aside>
          Popular Tags <br />

          {tags === null
            ? <>
                <span><Skeleton /></span>
                <span><Skeleton /></span>
                <span><Skeleton /></span>
              </>
            : tags.map(tag => (
              <span>{tag} </span>
            ))}
        </Aside>
      </StyledContainer>
    </Main>
  )
}
