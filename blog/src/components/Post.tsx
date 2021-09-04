import styled from 'styled-components';
import defaultPhotoAvatar from '../images/default-avatar.png';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ArticleT } from '../types';
import { Link } from 'react-router-dom';
import { LikeButton } from './LikeButton';

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
  article: ArticleT
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
        <LikeButton article={article}/>
      </PostHeader>
      <PostBody>
        <h3>{article.title}</h3>
        <div>{article.description}</div>
      </PostBody>
      <PostFooter>
        <Link to={`/articles/${article.slug}`}>
          <button>Read more...</button>
        </Link>
        <div>
          {article.tagList && article.tagList.map((tag, index) => (
            <span key={index}>
              {`#${tag} `}
            </span>
          ))}
        </div>
      </PostFooter>
    </StyledPost>
  )
}
