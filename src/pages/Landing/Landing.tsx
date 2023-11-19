import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from '@tanstack/react-query';
import CardList from '../../components/CardList/CardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import Loader from '../../components/Loader/Loader';
import fetchData from '../../utils/fetchQuery';
import {type RootState} from '../../store';
import {type TSmallData, type TFetchData} from '../../types/types';
import {setCountries} from '../../feature/themeSlice';

export default function Landing() {
	const {search} = useSelector((store: RootState) => store.countryApp.searchState);
	const dispatch = useDispatch();
	const dataToFetch: TFetchData = {
		search,
		base: (search && search !== 'all') ? `name/${search}` : 'all',
		queryKey: 'search',
	};

	const {data, isError, isLoading} = useQuery(fetchData<TSmallData[]>(dataToFetch));

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

