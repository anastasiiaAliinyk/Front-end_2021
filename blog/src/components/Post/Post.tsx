import styled from 'styled-components';
import defaultPhotoAvatar from '../../images/default-avatar.png';
import { ArticleT } from '../../types';
import { Link } from 'react-router-dom';
import { LikeButton } from '../LikeButton';
import { Button } from '../Button/Button';
import { Avatar } from '../Avatar/Avatar';

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
  align-items: center;
`

const PostTagsStyled = styled.div`
  text-align: right;
  width: 50%;
`

type PostProps = {
  article: ArticleT
}

export const Post = ({ article }: PostProps) =>
  <StyledPost>
    <PostHeader>
      <PostHeaderText>
        <Avatar src={article.author.image || defaultPhotoAvatar} alt='User Profile'/>
        <div>
          <Button primary >{article.author.username}</Button>
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
        <Button>Read more...</Button>
      </Link>
      <PostTagsStyled>
        {article.tagList && article.tagList.map((tag, index) => (
          <span key={index}>
            {`#${tag} `}
          </span>
        ))}
      </PostTagsStyled>
    </PostFooter>
  </StyledPost>
