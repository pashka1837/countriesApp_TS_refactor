import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from '@tanstack/react-query';
import CardList from '../../components/CardList/CardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import Loader from '../../components/Loader/Loader';
import fetchData from '../../utils/fetchQuery';
import {type RootState} from '../../store';
import {type TFetchData} from '../../types/types';
import {setCountries} from '../../feature/themeSlice';

// Function fetchData(search: string) {
// 	// const search = name.trim().toLowerCase();
// 	return {
// 		queryKey: ['search', search],
// 		retry: 1,
// 		async queryFn(): Promise<TSmallData[]> {
// 			const query = '?fields=name,flags,population,capital,region';
// 			const searchUrl: string = (search && search !== 'all') ? `name/${search}${query}` : `all${query}`;
// 			const response: AxiosResponse<TSmallData[]> = await customAxios.get(searchUrl);
// 			return response.data;
// 		},
// 	};
// }

// Export function loader(queryClient: QueryClient) {
// 	return async ({request}: {request: Request}) => {
// 		const url = new URL(request.url);
// 		const search = url.searchParams.get('search') ?? 'All';
// 		try {
// 			await queryClient.ensureQueryData(fetchData(search));
// 			return {search, error: null};
// 		} catch (error) {
// 			return {error, search};
// 		}
// 	};
// }

// type TLoaderReturn = {
// 	search: string;
// 	region?: string;
// 	error: undefined | Error;
// };

export default function Landing() {
	const {search} = useSelector((store: RootState) => store.countryApp.searchState);
	const dispatch = useDispatch();
	const dataToFetch: TFetchData = {
		search,
		base: (search && search !== 'all') ? `name/${search}` : 'all',
		queryKey: 'search',
	};

	const {data, isError, isLoading} = useQuery(fetchData(dataToFetch));

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return (<>
			<SearchForm />
			<h1 style={{paddingLeft: '5%'}}>No results found</h1>
		</>);
	}

	dispatch(setCountries(data));

	return (
		<>
			<SearchForm />
			 <CardList />
		</>
	);
}

// Export default function Landing() {
// 	const dispatch = useDispatch();
// 	const {search, error} = useLoaderData() as TLoaderReturn;

// 	if (error) {
// 		return (<>
// 			<SearchForm />
// 			<h1 style={{paddingLeft: '5%'}}>No results found</h1>;
// 		</>);
// 	}

// 	const {data} = useQuery(fetchData(search));

// 	dispatch(setCountries(data!));

// 	// Dispatch(setCountries(data));

// 	return (
// 		<>
// 			<SearchForm />
// 			 <CardList />
// 		</>
// 	);
// }

