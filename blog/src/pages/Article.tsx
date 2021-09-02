import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { Container } from '../components/Container';
import  { Loader } from '../components/Loader';
import { Comment } from '../components/Comment';

import defaultPhotoAvatar from '../images/default-avatar.png';
import { Article } from '../types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useApi } from '../hooks/useApi';
import styled from 'styled-components';
import {AppContext} from '../ context';

export const MainStyled = styled.main`
  padding-bottom: 54px
`

const MainContainerStyled = styled(Container)`
  margin-top: 50px;
`

const ArticleBlockStyled = styled.div`
  margin-bottom: 15px;
  padding: 25px;
  border-radius: 5px;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
`

const ArticleHeaderText = styled.div`
  display: flex;
  margin-bottom: 15px;

  & > img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
`

export const ArticlePage: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const {slug} = useParams<{slug: string}>();
  const {user} = useContext(AppContext);
  const {getArticleApi, deleteArticleApi} = useApi();
  const history = useHistory();

  useEffect(() => {
    getArticleApi(slug)
      .then(setArticle)
  }, []);

  const handleOnDelete = (slug: string) => {
    deleteArticleApi(slug)
      .then(() => history.push('/'));
  }

  return (
    <MainStyled>
      <MainContainerStyled>
        {!article && <Loader primary count={1} />}
        {article && <>
          <ArticleBlockStyled>
            <ArticleHeaderText>
              <div>
                <img src={article.author.image || defaultPhotoAvatar} alt='User Profile'/>
                <div>
                  <button>{article.author.username}</button>
                  <p>{article.createdAt}</p>
                </div>
              </div>
              <div>
                <button>
                  <EditIcon />
                </button>
                <button onClick={() => handleOnDelete(article.slug)}>
                  <DeleteForeverIcon />
                </button>
              </div>
            </ArticleHeaderText>
            <div>
              <h3>{article.title}</h3>
              <div>{article.body}</div>
            </div>
            <div>
              {article.tagList.map(tag => (
                <span>#{tag}</span>
              ))}
            </div>
          </ArticleBlockStyled>
          <ArticleBlockStyled>
            {user
              ?
                <Comment user={user} slug={slug} />
              : <div><Link to='/login'>Sign in</Link> or <Link to='/signup'>Sign up</Link> to add comments on this article</div>
            }
           </ArticleBlockStyled>
        </>}
         </MainContainerStyled>
    </MainStyled>
  )
}