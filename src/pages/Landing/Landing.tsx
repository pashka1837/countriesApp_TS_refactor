import {useLoaderData} from 'react-router-dom';
import {useQuery, type QueryClient} from '@tanstack/react-query';
import CardList from '../../components/CardList/CardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import {customAxios} from '../../axios/customAxios';
import {setCountries} from '../../feature/themeSlice';
import {type TSmallData} from '../../types/types';
import {useDispatch} from 'react-redux';

function fetchData(name: string) {
	const search = name.trim().toLowerCase();
	return {
		queryKey: ['search', search],
		async queryFn(): Promise<TSmallData[]> {
			const query = '?fields=name,flags,population,capital,region';
			const searchURL: string = (search && search !== 'all') ? `name/${search}${query}` : `all${query}`;
			const response: Response = await customAxios.get(searchURL);
			return response.data;
		},
	};
}

export function loader(queryClient: QueryClient) {
	return async ({request}: {request: Request}) => {
		const url = new URL(request.url);
		const search = url.searchParams.get('search') ?? 'All';
		try {
			await queryClient.ensureQueryData(fetchData(search));
			return {search, error: null};
		} catch (error) {
			return {error, search};
		}
	};
}

type TLoaderReturn = {
	search: string;
	region?: string;
	error: undefined | Error;
};

export default function Landing() {
	const dispatch = useDispatch();
	const {search, error} = useLoaderData() as TLoaderReturn;

	if (error) {
		return (<>
			<SearchForm />
			<h1 style={{paddingLeft: '5%'}}>No results found</h1>;
		</>);
	}

	const {data} = useQuery(fetchData(search));
	dispatch(setCountries(data!));

	return (
		<>
			<SearchForm />
			 <CardList />
		</>
	);
}

