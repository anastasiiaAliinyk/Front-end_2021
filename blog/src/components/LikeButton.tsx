import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { secondaryColorText, animationTime } from '../constants';
import { useApi } from '../hooks/useApi';
import { ArticleT } from '../types';
import { useRequestState } from '../hooks/useRequestState';

const LikeButtonStyled = styled.button`
  display: flex;
  align-items: center;
  padding: 3px;
  
  border: 1px solid ${secondaryColorText};
  border-radius: 3px;
  color: ${secondaryColorText};
  background-color: ${props => props.theme.colors.primaryBackground};
  transition: background-color ${animationTime} ease-out, color ${animationTime} ease-out;
  
  &:hover {
    cursor: pointer;
    background-color: ${secondaryColorText};
    color: #f2f2f2;
  }
  
  & > p {
    margin-left: 5px;
  }
`;

type LikeButtonProps = {
  article: ArticleT
}

export const LikeButton: React.FC<LikeButtonProps> = ({ article }) => {
  const [favorited, setFavorited] = useState<boolean>(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState<number>(article.favoritesCount);

  const { favoriteArticleApi, unFavoriteArticleApi } = useApi();

  const apiFunction = favorited ? unFavoriteArticleApi : favoriteArticleApi;
  const [toggleFavoriteInProgress, toggleFavorite] = useRequestState<ArticleT>(apiFunction);

  const handleOnClick = (slug: string) => {
    toggleFavorite(slug)
      .then(article => {
        setFavoritesCount(article.favoritesCount);
        setFavorited(article.favorited);
      });
  };

  return (
    <LikeButtonStyled onClick={() => handleOnClick(article.slug)}>
      {toggleFavoriteInProgress ? <CircularProgress size='20px'/> : (
        <>
          <FavoriteIcon fontSize='small'/>
          <p>{favoritesCount}</p>
        </>
      )}
    </LikeButtonStyled>
  );
};
