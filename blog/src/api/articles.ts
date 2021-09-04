import axios, { AxiosInstance } from 'axios';
import {ArticleT, NewArticleT, UpdateArticleT} from '../types';

export type ArticlesResponse = {
  articles: ArticleT[]
  articlesCount: number
}

export const getArticles = (baseUrl: string) => (): Promise<ArticlesResponse> => {
  return axios.get(`${baseUrl}/api/articles`)
    .then(response => response.data);
};

export const getFeeds = (authAxiosInstance: AxiosInstance) => (): Promise<ArticlesResponse> => {
  return authAxiosInstance.get(`/api/articles/feed`)
    .then(response => response.data);
};

export const getUserArticles = (baseUrl: string) => (name: string): Promise<ArticlesResponse> => {
  return axios.get(`${baseUrl}/api/articles?author=${name}`)
    .then(response => response.data);
};

export const getArticlesByTag = (baseUrl: string) => (tag: string): Promise<ArticlesResponse> => {
  return axios.get(`${baseUrl}/api/articles?tag=${tag}`)
    .then(response => response.data);
};

export const getArticle = (baseUrl: string) => (slug: string): Promise<ArticleT> =>
  axios.get(`${baseUrl}/api/articles/${slug}`)
    .then(response => response.data.article);

export const favoriteArticle = (authAxiosInstance: AxiosInstance) => (slug: string): Promise<ArticleT> =>
  authAxiosInstance.post(`/api/articles/${slug}/favorite`)
    .then(response => response.data.article);

export const unFavoriteArticle = (authAxiosInstance: AxiosInstance) => (slug: string): Promise<ArticleT> =>
  authAxiosInstance.delete(`/api/articles/${slug}/favorite`)
    .then(response => response.data.article);

export const createArticle = (authAxiosInstance: AxiosInstance) => (article: NewArticleT): Promise<ArticleT> =>
  authAxiosInstance.post('/api/articles', {article: article})
    .then(response => response.data.article);

export const updateArticle = (authAxiosInstance: AxiosInstance) => (slug: string, article: UpdateArticleT): Promise<ArticleT> =>
  authAxiosInstance.put(`/api/articles/${slug}`, {article})
    .then(response => response.data.article);

export const deleteArticle = (authAxiosInstance: AxiosInstance) => (slug: string): Promise<ArticleT> =>
  authAxiosInstance.delete(`/api/articles/${slug}`)
    .then(response => response.data.article);
