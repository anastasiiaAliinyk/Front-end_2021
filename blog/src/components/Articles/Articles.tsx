import React from 'react';
import { Post } from '../Post/Post';
import { ArticleT } from '../../types';
import { ArticlesTextStyled } from './Articles.styled';

type ArticlesProps = {
  articles: ArticleT[]
}

export const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  return (
    <>
      {articles.length ? articles.map(article => (
        <Post
          key={article.slug}
          article={article}
        />
      )) : (
        <ArticlesTextStyled>No articles are here yet...</ArticlesTextStyled>
      )}
    </>
  );
};
