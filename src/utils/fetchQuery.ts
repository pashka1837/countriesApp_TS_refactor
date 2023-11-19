import {type TFetchData} from '../types/types';
import {type AxiosResponse, customAxios} from '../axios/customAxios';

function fetchData <T>({search, base, queryKey, aditionalQuery = ''}: TFetchData) {
	return {
		queryKey: [`${queryKey}`, search],
		retry: 1,
		async queryFn(): Promise<T> {
			const query = `?fields=name,flags,population,capital,region${aditionalQuery}`;
			const searchUrl = `${base}${query}`;
			const response: AxiosResponse<T> = await customAxios.get(searchUrl);
			return response.data;
		},
	};
}

export default fetchData;
