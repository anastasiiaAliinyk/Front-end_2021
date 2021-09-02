import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultPhotoAvatar from '../images/default-avatar.png';
import { User, CommentT } from '../types';
import { useApi } from '../hooks/useApi';

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
  user: User | null
  slug: string
}

export const Comment: React.FC<CommentProps> = ({user, slug}) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentT[]>([]);
  const {getCommentsApi, addCommentApi} = useApi();

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    addCommentApi(slug, comment)
      .then((data) => {
        setComment('');
        setComments(comments => [...comments, data.comment])
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
            Post comment
          </ButtonStyled>
        </FormStyled>
      </CommentContainerStyled>
      {comments && comments.reverse().map(comment => (
        <DivStyled>
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
