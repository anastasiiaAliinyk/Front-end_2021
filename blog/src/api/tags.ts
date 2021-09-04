import axios from 'axios';
import { TagT } from '../types';

export type TagsResponse = {
  tags: TagT[]
}

export const getTags = (baseUrl: string) => () : Promise<TagsResponse> => {
  return axios.get(`${baseUrl}/api/tags`)
    .then(response => response.data);
};
