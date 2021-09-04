import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultPhotoAvatar from '../images/default-avatar.png';
import { UserT, CommentT } from '../types';
import { useApi } from '../hooks/useApi';
import { CommentResponse } from '../api/comments';
import { CircularProgress } from '@material-ui/core';
import { useRequestState } from '../hooks/useRequestState';

const CommentContainerStyled = styled.div`
  display: flex;
`

const CommentAvatarStyled = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 15px;
  border-radius: 50%;
`

const FormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const TextareaStyled = styled.textarea`
  min-height: 50px;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  
  &:focus {
    border: 1px solid lightblue;
  }
`

const ButtonStyled = styled.button`
  align-self: flex-end;
  margin-bottom: 20px;
  padding: 10px;
  
  color: white;
  background-color: #3397b7;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
    background-color: #7f7f7f;
  }
`

const DivStyled = styled.div`
  margin: 0 0 20px 55px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
`

type CommentProps = {
  user: UserT | null
  slug: string
}

export const Comments: React.FC<CommentProps> = ({user, slug}) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentT[]>([]);
  const {getCommentsApi, addCommentApi} = useApi();

  const [addCommentInProgress, addComment] = useRequestState<CommentResponse>(addCommentApi);

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    addComment(slug, comment)
      .then((commentResponse) => {
        setComment('');
        setComments(comments => [commentResponse.comment, ...comments])
      });
  }

  useEffect(() => {
    getCommentsApi(slug)
      .then(data => setComments(data.comments));
  }, [])

  return (
    <>
      <CommentContainerStyled>
        <CommentAvatarStyled src={user && user.image || defaultPhotoAvatar} alt='User'/>
        <FormStyled onSubmit={(e) => handleOnSubmit(e)}>
          <TextareaStyled
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name='comment'
            placeholder='Write your comment'
          />
          <ButtonStyled type='submit' disabled={!comment}>
            {addCommentInProgress ? <CircularProgress size='20px' /> : 'Post comment'}
          </ButtonStyled>
        </FormStyled>
      </CommentContainerStyled>

      {comments && comments.map(comment => (
        <DivStyled key={comment.id}>
          <div>
            <CommentAvatarStyled src={comment.author.image} alt="User"/>
            <h4>{comment.author.username}</h4>
          </div>
          {comment.body}
        </DivStyled>
      ))}
    </>
  )
}
