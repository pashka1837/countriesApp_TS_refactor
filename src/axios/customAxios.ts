import axios from 'axios';

const baseURL = 'https://restcountries.com/v3.1/';
// https://restcountries.com/v3.1/all?fields=name,flags,population,capital

export const customAxios = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});
