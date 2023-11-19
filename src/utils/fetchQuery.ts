import {type TFetchData, type TSmallData} from '../types/types';
import {type AxiosResponse, customAxios} from '../axios/customAxios';
// Function fetchData(search: string, base: string, queryKey: string, aditionalQuery?: string) {

function fetchData({search, base, queryKey, aditionalQuery = ''}: TFetchData) {
	return {
		queryKey: [`${queryKey}`, search],
		retry: 1,
		async queryFn(): Promise<TSmallData[]> {
			const query = `?fields=name,flags,population,capital,region${aditionalQuery}`;
			const searchUrl = `${base}${query}`;
			const response: AxiosResponse<TSmallData[]> = await customAxios.get(searchUrl);
			return response.data;
		},
	};
}

export default fetchData;
