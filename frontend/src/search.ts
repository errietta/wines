import axios from 'axios';

export const searchPhrase = (query: string) => {
  const apiUrl = process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000';
  const client = axios.create();
  return client.post(`${apiUrl}/search`, { search: query });
};
