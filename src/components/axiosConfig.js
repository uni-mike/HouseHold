import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5555/api',
  withCredentials: true,
});

export default instance;

