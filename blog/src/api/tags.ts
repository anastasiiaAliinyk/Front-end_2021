import axios from 'axios';
import { Tag } from '../types';

export type TagsResponse = {
  tags: Tag[]
}

export const getTags = (baseUrl: string) => () : Promise<TagsResponse> => {
  return axios.get(`${baseUrl}/api/tags`)
    .then(response => response.data);
};
