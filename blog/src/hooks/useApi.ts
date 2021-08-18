import axios from 'axios';
import {
  getArticles,
  getArticle,
  updateArticle,
  createArticle,
} from '../api/articles';
import { getTags } from '../api/tags';
import { login, signUp } from '../api/user';
import { baseURL } from '../constants';

export const useApi = () => {
  const authInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Token someToken`,
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
    loginApi: login(baseURL),
    signUpApi: signUp(baseURL),
  };
};
