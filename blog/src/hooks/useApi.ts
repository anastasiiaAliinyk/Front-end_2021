import axios from 'axios';
import { baseURL } from '../constants';
import {
  getArticles,
  getFeeds,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByTag,
  favoriteArticle,
  unFavoriteArticle,
  getUserArticles, getArticlesByAuthor, getFavoriteArticlesByAuthor
} from '../api/articles';
import { getTags } from '../api/tags';
import {
  getUser,
  getUserProfile,
  login,
  signUp,
  updateUser
} from '../api/user';
import {
  addComment,
  getComments
} from '../api/comments';

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
    getArticlesByAuthorApi: getArticlesByAuthor(baseURL),
    getFavoriteArticlesByAuthorApi: getFavoriteArticlesByAuthor(baseURL),
    getFeedsApi: getFeeds(authInstance),
    getUserArticlesApi: getUserArticles(baseURL),
    getArticlesByTagApi: getArticlesByTag(baseURL),
    getArticleApi: getArticle(baseURL),
    favoriteArticleApi: favoriteArticle(authInstance),
    unFavoriteArticleApi: unFavoriteArticle(authInstance),
    createArticleApi: createArticle(authInstance),
    updateArticleApi: updateArticle(authInstance),
    deleteArticleApi: deleteArticle(authInstance),
    //Tags
    getTagsApi: getTags(baseURL),

    //Comments
    getCommentsApi: getComments(authInstance),
    addCommentApi: addComment(authInstance),
    //User
    getUserApi: getUser(authInstance),
    getUserProfileApi: getUserProfile(baseURL),
    updateUserApi: updateUser(authInstance),
    loginApi: login(baseURL),
    signUpApi: signUp(baseURL),
  };
};
