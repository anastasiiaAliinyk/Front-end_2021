import Modal from 'react-modal';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '../TextField/TextField';
import { SubmitButton } from '../SubmitButton';
import CloseIcon from '@material-ui/icons/Close';

import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';
import { ArticleT } from '../../types';
import { useRequestState } from '../../hooks/useRequestState';

const CloseIconStyled = styled(CloseIcon)`
  cursor: pointer;

  &:hover {
    background-color: rgba(198, 202, 238, 0.5);
    border-radius: 50%;
  }
`;
const DivStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ArticleModalStyled = styled(Modal)`
  max-width: 600px;
  width: 100%;
  margin: 50px auto;
  padding: 30px;

  line-height: 2rem;
  background-color: white;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
  
  &:focus {
    outline: none;
  }
`;

type ArticleModalProps = {
  modalIsOpen: boolean
  onCloseModal: (article: ArticleT | null) => void
  article?: ArticleT | null
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ modalIsOpen, onCloseModal, article }) => {
  const history = useHistory();
  const { createArticleApi, updateArticleApi } = useApi();

  const [title, setTitle] = useState(article ? article.title : '');
  const [description, setDescription] = useState(article ? article.description : '');
  const [body, setBody] = useState(article ? article.body : '');
  const [tags, setTags] = useState(article ? article.tagList.join(' ') : '');

  const apiFunc = article
    ? updateArticleApi.bind(null, article.slug)
    : createArticleApi;
  const [createUpdateArticleInProgress, createUpdateArticle] = useRequestState<ArticleT>(apiFunc);

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    createUpdateArticle({
      title,
      description,
      body: body,
      tagList: tags.split(' ')
    })
      .then((newArticle) => {
        if (!article) {
          history.push(`/articles/${newArticle.slug}`);
        }
        onCloseModal(newArticle);
      });
  };

  return (
    <ArticleModalStyled
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={() => onCloseModal(null)}
    >
      <DivStyled>
        <h3>{article ? 'Edit Article' : 'New Article'}</h3>
        <CloseIconStyled onClick={() => onCloseModal(null)}/>
      </DivStyled>
      <form onSubmit={handleOnSubmit}>
        <TextField
          type="text"
          labelText="Article title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
        />
        <TextField
          type="text"
          labelText="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <TextField
          type="text"
          labelText="Write your article"
          name="article"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Article"
        />
        <TextField
          type="text"
          labelText="Tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags"
        />
        <SubmitButton disabled={!title || !body}>
          {createUpdateArticleInProgress ? (
            <CircularProgress size="20px"/>
          ) : (
            article ? 'Update Article' : 'Publish Article'
          )}
        </SubmitButton>
      </form>
    </ArticleModalStyled>
  );
};
