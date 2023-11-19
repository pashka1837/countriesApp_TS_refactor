import {
	useLoaderData, useLocation, useSubmit, json, useNavigate, type Params, useParams,
} from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';
import {useMemo} from 'react';
import {type AxiosResponse, customAxios} from '../../axios/customAxios';
import {useDispatch, useSelector} from 'react-redux';
import {useQuery, type QueryClient} from '@tanstack/react-query';

import './Country.css';
import {type RootState} from '../../store';
import Loader from '../../components/Loader/Loader';
import fetchData from '../../utils/fetchQuery';
import {type TFetchData} from '../../types/types';

function refactor(obj) {
	const property = new Map();
	for (const [key, value] of Object.entries(obj)) {
		if (key === 'flags' || key === 'borders') {
			continue;
		} else if (typeof value !== 'object') {
			property.set(key, [value]);
		} else if (Array.isArray(value)) {
			property.set(key, [...value]);
		} else {
			for (const [key1, value1] of Object.entries(value)) {
				if (key === 'currencies') {
					property.set(key, [...property.get(key) || [], value1.name]);
				}

				if (key === 'languages') {
					property.set(key, [...property.get(key) || [], value1]);
				}

				if (key === 'name') {
					if (key1 !== 'nativeName') {
						continue;
					}

					for (const [keyN, valueN] of Object.entries(value1)) {
						property.set('native name', [...property.get('native name') || [], valueN.common]);
					}
				}
			}
		}
	}

	return property;
}

// Function fetchData(search: string, base: string, queryKey:string) {
// 	return {
// 		queryKey: ['searchCountry', search],
// 		retry: 1,
// 		async queryFn(): Promise<TSmallData[]> {
// 			const query = '?fields=name,flags,population,capital,region,subregion,tld,currencies,languages,borders,area';
// 			const searchUrl: string = ()  `name/${search}${query}`;
// 			const response: AxiosResponse<TSmallData[]> = await customAxios.get(searchUrl);
// 			return response.data;
// 		},
// 	};
// }

export function loader(queryClient: QueryClient) {
	return async ({params}: Params) => {
		const {name} = params;
		try {
			const data = await queryClient.fetchQuery(fetchData(name));
			return {data};
		} catch (e) {
			throw json({...e});
		}
	};
}

export default function Country() {
	const {name} = useParams();
	const navigate = useNavigate();

	const dataToFetch: TFetchData = {
		search: name!,
		base: `name/${name}`,
		queryKey: 'searchCountry',
		aditionalQuery: ',subregion,tld,currencies,languages,borders,area',
	};

	const {data, isError, isLoading} = useQuery(fetchData(dataToFetch));

	if (isLoading) {
		return <Loader/>;
	}

	// Const refactorData = useMemo(() => Array.from(refactor(data[1] || data[0])), [data]);
	const refactorData = Array.from(refactor(data[1] || data[0]));

	const {
		borders,
		flags,
		name: nameOfCountry,
	} = data[1] ?? data[0];

	function handleBackButton() {
		// Const searchParams = new URLSearchParams();
		// searchParams.append('search', searchState.search);
		// submit(searchParams, {method: 'get', action: '/'});
		navigate('/');
	}

	return (
		<div className='country-container'>
			<button onClick={handleBackButton} className='country-back-btn' type='button'>
				<BiArrowBack />
				{'  '}
        Back
			</button>
			<div className='inner-country-container'>
				<img className='country-flag' src={flags?.svg} alt={nameOfCountry?.common} />
				<div className='country'>
					<h1>{nameOfCountry?.official || nameOfCountry?.common}</h1>
					<div className='country-desc'>
						{refactorData.map((d, i) => {
							let [key, value] = d;
							if (key === 'tld') {
								key = 'Top Level Domain';
							}

							return (
								<h5 className={i === 5 ? 'h5-desc' : ''} key={key}>
									{key}
									{': '}
									<span>
										{value.join(', ')}
									</span>
									{key === 'area' && (
										<span>
											{' '}
                    km
											<sup>2</sup>
										</span>
									)}
								</h5>
							);
						})}
					</div>

					<div className='border-countries-container'>
						<h5>
              Border Countries:
							{' '}
						</h5>
						{borders.length
							? borders.map(b => (
								<span key={b} className='border-countries'>
									{b || 'None'}
									{' '}
								</span>
							))
							: <span className='border-countries'>None</span>}

					</div>

				</div>
			</div>

		</div>
	);
}
