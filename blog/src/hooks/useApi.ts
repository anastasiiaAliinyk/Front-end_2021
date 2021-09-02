import axios from 'axios';
import {
  getArticles,
  getFeeds,
  getArticle,
  deleteArticle,
  createArticle,
  getArticlesByTag,
  favoriteArticle,
  unFavoriteArticle,
  getUserArticles
} from '../api/articles';
import { getTags } from '../api/tags';
import {getUser, login, signUp} from '../api/user';
import { baseURL } from '../constants';
import {addComment, getComments} from '../api/comments';

export const useApi = () => {
  const token = window.localStorage.getItem('token');
  const authInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return {
    //Article
    getArticlesApi: getArticles(baseURL),
    getFeedsApi: getFeeds(authInstance),
    getUserArticlesApi: getUserArticles(baseURL),
    getArticlesByTagApi: getArticlesByTag(baseURL),
    getArticleApi: getArticle(baseURL),
    favoriteArticleApi: favoriteArticle(authInstance),
    unFavoriteArticleApi: unFavoriteArticle(authInstance),
    // updateArticleApi: updateArticle(authInstance),
    createArticleApi: createArticle(authInstance),
    deleteArticleApi: deleteArticle(authInstance),
    //Tags
    getTagsApi: getTags(baseURL),

    //Comments
    getCommentsApi: getComments(authInstance),
    addCommentApi: addComment(authInstance),
    //User
    getUserApi: getUser(authInstance),
    loginApi: login(baseURL),
    signUpApi: signUp(baseURL),
  };
};
