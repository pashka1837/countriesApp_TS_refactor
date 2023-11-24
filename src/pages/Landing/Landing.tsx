import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from '@tanstack/react-query';
import CardList from '../../components/CardList/CardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import Loader from '../../components/Loader/Loader';
import fetchData from '../../utils/fetchQuery';
import {type RootState} from '../../store';
import {type TSmallData, type TFetchData} from '../../types/types';
import {setCountries} from '../../feature/themeSlice';
import {AxiosError} from 'axios';
import PageError from '../PageError/PageError';

export default function Landing() {
	const search = useSelector((store: RootState) => store.countryApp.search);
	const dispatch = useDispatch();

	const dataToFetch: TFetchData = {
		search,
		base: (search && search !== 'all') ? `name/${search}` : 'all',
		queryKey: 'search',
	};

	const {data, error, isFetching} = useQuery(fetchData<TSmallData[]>(dataToFetch));

	if (isFetching) {
		return <Loader />;
	}

	if (error && error instanceof AxiosError) {
		if (error.code === 'ERR_BAD_REQUEST') {
			return (<>
				<SearchForm />
				<h1 style={{paddingLeft: '5%'}}>No results found</h1>
			</>);
		}

		console.log(error);

		return <PageError error={error} />;
	}

	dispatch(setCountries(data!));

	return (
		<>
			<SearchForm />
			<CardList />
		</>
	);
}

