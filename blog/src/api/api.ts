import { baseURL } from '../constants';

const request = async(input: RequestInfo, options: RequestInit = {}) => {
  const response = await fetch(`${baseURL}${input}`, options);
  if (!response.ok) {
    throw new Error(`Failed to load data ${input}`);
  }

  try {
    return await response.json();
  } catch {
    return response.text();
  }
};

export const getAllArticles = () => request('/articles');

export const getAllTags = () => request('/tags')
  .then(response => response.tags);
