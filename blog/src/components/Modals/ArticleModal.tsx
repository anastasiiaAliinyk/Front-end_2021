import Modal from 'react-modal';
import React, { useState } from 'react';
import { TextField } from '../TextField/TextField';
import { SubmitButton } from '../SubmitButton';
import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress } from '@material-ui/core';

import styled from 'styled-components';
import {useApi} from '../../hooks/useApi';
import {useHistory} from "react-router-dom";
const CloseIconStyled = styled(CloseIcon)`
  cursor: pointer;

  &:hover {
    background-color: rgba(198, 202, 238, 0.5);
    border-radius: 50%;
  }
`
const DivStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
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
`

type ArticleModalProps = {
  modalIsOpen: boolean
  closeModal: () => void
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ modalIsOpen, closeModal }) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const { createArticleApi } = useApi();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    createArticleApi({
      title,
      description,
      body: article,
      tagList: tags.split(' ')
    })
      .then((response) => {
        setLoading(false);
        history.push(`/articles/${response.slug}`);
        closeModal();
      })
      .catch(() => {
        setTitle('');
        setDescription('');
        setArticle('');
        setTags('');
        setLoading(false)
      })
  }

  return (
    <ArticleModalStyled
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      <DivStyled>
        <h3>New Article</h3>
        <CloseIconStyled onClick={closeModal} />
      </DivStyled>
      <form onSubmit={handleOnSubmit}>
        <TextField
          type='text'
          labelText='Article title'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Article title'
        />
        <TextField
          type='text'
          labelText='Description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
        />
        <TextField
          type='text'
          labelText='Write your article'
          name='article'
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          placeholder='Article'
        />
        <TextField
          type='text'
          labelText='Tags'
          name='tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder='Tags'
        />
        <SubmitButton disabled={!title || !article}>
          {loading ? <CircularProgress size='20px' /> : 'Publish Article'}
        </SubmitButton>
      </form>
    </ArticleModalStyled>
  )
}
