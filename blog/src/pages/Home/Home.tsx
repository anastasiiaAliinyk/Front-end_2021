import React, { useEffect, useState } from 'react';
import { Hero } from '../../components/Hero/Hero';
import { HomeTabs } from '../../components/HomeTabs/HomeTabs';
import { Tags } from '../../components/Tags/Tags';

import { useApi } from '../../hooks/useApi';
import { ArticleT } from '../../types';
import { 
  MainStyled, 
  MainContainerStyled, 
  MainContentStyled, 
  MainAsideStyled 
} from './Home.styled';

export const Home: React.FC = () => {
  const [articlesByTag, setArticlesByTag] = useState<ArticleT[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const { getArticlesByTagApi } = useApi();

  useEffect(() => {
    getArticlesByTagApi(selectedTag)
      .then(data => setArticlesByTag(data.articles))
      .finally(() => setIsLoaded(true))
  }, [selectedTag])

  return (
    <MainStyled>
      <Hero />
      <MainContainerStyled>
        <MainContentStyled>
          <HomeTabs
            articlesByTag={articlesByTag}
            selectedTag={selectedTag}
            iaLoadedByTags={isLoaded}
            setSelectedTag={setSelectedTag}
          />
        </MainContentStyled>
        <MainAsideStyled>
          <Tags onSelectTag={setSelectedTag} />
        </MainAsideStyled>
      </MainContainerStyled>
    </MainStyled>
  )
}
