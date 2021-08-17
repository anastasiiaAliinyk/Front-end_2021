import axios, { AxiosInstance } from 'axios';
import { Article } from '../types';

export type ArticlesResponse = {
  articles: Article[]
  articlesCount: number
}

export const getArticles = (baseUrl: string) => (): Promise<ArticlesResponse> => {
  return axios.get(`${baseUrl}/api/articles`)
    .then(response => response.data);
};

export const getArticle = (baseUrl: string) => (slug: string) =>
  axios.get(`${baseUrl}/api/articles/${slug}`);

export const updateArticle = (authAxiosInstance: AxiosInstance) => (slug: string, article: string) =>
  authAxiosInstance.put(`/api/articles/${slug}`, article);

export const createArticle = (authAxiosInstance: AxiosInstance) => (article: string) =>
  authAxiosInstance.post(`/api/articles`, article);
