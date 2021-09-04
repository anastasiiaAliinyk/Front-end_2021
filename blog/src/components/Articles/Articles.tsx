import React from 'react';
import { Post } from '../Post';
import { ArticleT } from '../../types';
import { ArticlesTextStyled } from './Articles.styled';

type ArticlesProps = {
  isLoaded: boolean
  articles: ArticleT[]
}

export const Articles: React.FC<ArticlesProps> = ({ isLoaded, articles }) => {
  return (
    <>
      {isLoaded && (
        articles.length > 0
          ? articles.map(article => (
            <Post
              key={article.slug}
              article={article}
            />
          ))
          : <ArticlesTextStyled>No articles are here yet...</ArticlesTextStyled>
      )}
    </>
  )
}
