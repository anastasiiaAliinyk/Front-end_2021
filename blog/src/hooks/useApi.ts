import axios from 'axios';
import {
  getArticles,
  getArticle,
  updateArticle,
  createArticle,
} from '../api/articles';
import { getTags } from '../api/tags';
import {getUser, login, signUp} from '../api/user';
import { baseURL } from '../constants';

export const useApi = () => {
  const token = window.localStorage.getItem('token');
  const authInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return {
    //Articles
    getArticlesApi: getArticles(baseURL),
    getArticleApi: getArticle(baseURL),
    updateArticleApi: updateArticle(authInstance),
    createArticleApi: createArticle(authInstance),

    getTagsApi: getTags(baseURL),

    //User
    getUserApi: getUser(authInstance),
    loginApi: login(baseURL),
    signUpApi: signUp(baseURL),
  };
};
