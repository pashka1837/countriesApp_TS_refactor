import axios, {type AxiosResponse} from 'axios';

const baseURL = 'https://restcountries.com/v3.1/';

const defaults = {
	baseURL,
	headers: {
		Accept: 'application/json',
	},
};

export const customAxios = axios.create({...defaults});

export {type AxiosResponse};
