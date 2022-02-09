import axios from 'axios';

export const API_CONFIG = {
  baseUrl: 'http://localhost:8080',
};

export const API_AXIOS = axios.create({
  baseURL: 'http://localhost:8080',
});
