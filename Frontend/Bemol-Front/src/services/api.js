import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Note que não inclui /to-do aqui
});