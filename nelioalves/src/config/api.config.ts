import axios from 'axios';

export const API_CONFIG = {
  baseUrl: 'https://augustojaml-bckend-spring.herokuapp.com',
  bucketBaseUrl: 'https://jaml-mcspring-backeng.s3.sa-east-1.amazonaws.com',
};

export const API_AXIOS = axios.create({
  baseURL: 'http://localhost:8080',
});
