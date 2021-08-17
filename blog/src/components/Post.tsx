import styled from 'styled-components';
import defaultPhotoAvatar from '../images/default-avatar.png';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { animationTime, secondaryColorText } from '../constants';
import {Article} from '../types';

const StyledPost = styled.div`
  margin-bottom: 15px;
  padding: 20px;
  
  line-height: 1.5rem;
  border-radius: 4px;
  box-shadow: rgb(203 211 212 / 50%) 0 2px 12px 0;
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`

const PostHeaderText = styled.div`
  display: flex;
  margin-bottom: 15px;
  
  & > img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
`

const PostHeaderLikeButton = styled.button`
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
`

const PostBody = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  
  border: 1px solid lightblue;
  border-radius: 4px;
`

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

type PostProps = {
  article: Article
}

export const Post = ({ article }: PostProps) => {
  return (
    <StyledPost>
      <PostHeader>
        <PostHeaderText>
          <img src={article.author.image || defaultPhotoAvatar} alt='User Profile'/>
          <div>
            <button>{article.author.username}</button>
            <p>{article.createdAt}</p>
          </div>
        </PostHeaderText>
        <PostHeaderLikeButton>
          <FavoriteIcon fontSize='small' />
          <p>{article.favoritesCount}</p>
        </PostHeaderLikeButton>
      </PostHeader>
      <PostBody>
        <h3>{article.title}</h3>
        <div>{article.body}</div>
      </PostBody>
      <PostFooter>
        <button>Read more...</button>
        <div>
          Tags
        </div>
      </PostFooter>
    </StyledPost>
  )
}