import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Container } from '../components/Container';
import { Loader } from '../components/Loader/Loader';
import { Comments } from '../components/Comments';
import { LikeButton } from '../components/LikeButton';

import defaultPhotoAvatar from '../images/default-avatar.png';
import { ArticleT } from '../types';
import { useApi } from '../hooks/useApi';
import { AppContext } from '../ context';
import { useRequestState } from '../hooks/useRequestState';
import { ArticleModal } from '../components/Modals/ArticleModal';
import { Avatar } from '../components/Avatar/Avatar';
import {Button} from "../components/Button/Button";

export const MainStyled = styled.main`
  padding-bottom: 54px
`;

const MainContainerStyled = styled(Container)`
  margin-top: 50px;
`;

const ArticleBlockStyled = styled.div`
  margin-bottom: 15px;
  padding: 25px;

  line-height: 1.5rem;
  border-radius: 5px;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
`;

const ArticleHeaderText = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: start;
  justify-content: space-between;

  & > img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
`;

const TagListStyled = styled.div`
  margin: 30px 0 0 50%;
  text-align: right;
`

const ArticleHeaderInfo = styled.div`
  display: flex;
  align-items: center;
`

const LinksBlockStyled = styled.div`
  text-align: center;
  
  & > a {
    color: #0a84e5;
  }
`

export const ArticlePage: React.FC = () => {
  const history = useHistory();
  const { slug } = useParams<{ slug: string }>();
  const { user } = useContext(AppContext);

  const { getArticleApi, deleteArticleApi } = useApi();

  const [article, setArticle] = useState<ArticleT | null>(null);
  const [editArticle, setEditArticle] = useState(false);

  const [deleteArticleInProgress, deleteArticle] = useRequestState<ArticleT>(deleteArticleApi);

  useEffect(() => {
    getArticleApi(slug)
      .then(setArticle);
  }, []);

  const handleOnDelete = (slug: string) => {
    deleteArticle(slug)
      .then(() => history.push('/'));
  };

  const handleOnCloseModal = (article: ArticleT | null) => {
    if (article) {
      setArticle(article);
    }
    setEditArticle(false);
  };

  return (
    <MainStyled style={{
      pointerEvents: deleteArticleInProgress ? 'none' : 'auto',
      opacity: deleteArticleInProgress ? 0.5 : 1
    }}>
      <MainContainerStyled>
        {!article && <Loader primary count={1} />}
        {article && <>
          <ArticleBlockStyled>
            <ArticleHeaderText>
              <ArticleHeaderInfo>
                <Avatar
                  src={article.author.image || defaultPhotoAvatar}
                  alt='User Profile'
                  size={50}
                />
                <div>
                  <Button primary>
                    {article.author.username}
                  </Button>
                  <p>{article.createdAt}</p>
                </div>
              </ArticleHeaderInfo>
              {typeof user === 'object' && user && (
                article.author.username === user.username
              ) ? (
                <div>
                  <button onClick={() => setEditArticle(true)}>
                    <EditIcon/>
                  </button>
                  <button onClick={() => handleOnDelete(article.slug)}>
                    {deleteArticleInProgress ? <CircularProgress size='20px'/> : <DeleteForeverIcon/>}
                  </button>
                </div>
              ) : (
                <LikeButton article={article} />
              )}
            </ArticleHeaderText>
            <div>
              <h3>{article.title}</h3>
              <div>{article.body}</div>
            </div>
            <TagListStyled>
              {article.tagList.map(tag => (
                <span key={tag}>#{tag} </span>
              ))}
            </TagListStyled>
          </ArticleBlockStyled>
          <ArticleBlockStyled>
            {typeof user === 'object' && user ? (
              <Comments user={user} slug={slug}/>
            ) : (
              <LinksBlockStyled>
                <Link to='/login'>Sign in</Link> or <Link to='/signup'>
                Sign up</Link> to add comments on this article
              </LinksBlockStyled>
            )
            }
          </ArticleBlockStyled>
        </>}
      </MainContainerStyled>

      {article && (
        <ArticleModal
          article={article}
          modalIsOpen={editArticle}
          onCloseModal={handleOnCloseModal} />
      )}
    </MainStyled>
  );
};
