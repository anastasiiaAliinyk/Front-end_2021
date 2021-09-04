import { AxiosInstance } from 'axios';
import { CommentT } from '../types';

type CommentsResponse = {
  comments: CommentT[]
}

export type CommentResponse = {
  comment: CommentT
}

export const getComments = (authAxiosInstance: AxiosInstance) => (slug: string): Promise<CommentsResponse> => {
  return authAxiosInstance.get(`/api/articles/${slug}/comments`)
    .then(response => response.data);
};

export const addComment = (authAxiosInstance: AxiosInstance) => (slug: string, body: string): Promise<CommentResponse> => {
  return authAxiosInstance.post(`/api/articles/${slug}/comments`, {comment: {body}})
    .then(response => response.data);
};
