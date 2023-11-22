
import {useParams} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import {BackButton, Description, BorderCountries} from './index.ts';
import fetchData from '../../utils/fetchQuery';
import {type TCountrySingleDesc, type TBigData, type TFetchData, type TCurrency, type TNativeName, type TCurrencies} from '../../types/types';
import {AxiosError} from 'axios';
import PageError from '../PageError/PageError.tsx';
import './Country.css';

function refactor(obj: Omit<TBigData, 'flags'>): Map<string, string[]> {
	const property = new Map<string, string[]>();
	for (const [key, value] of Object.entries(obj)) {
		if (key === 'flags' || key === 'borders') {
			continue;
		} else if (typeof value !== 'object') {
			property.set(key, [`${value}`]);
		} else if (Array.isArray(value)) {
			property.set(key, [...value]);
		} else {
			Object.entries(value).forEach((ar: [string, TCurrency | string | TNativeName ]) => {
				const curKey = ar[0];
				const curValue = ar[1];
				let propName = key;
				let existProp: string[] = [];
				if (propName !== 'name') {
					existProp = property.get(key) ?? [];
					if (propName === 'currencies' && typeof curValue === 'object') {
						existProp.push(curValue.name as string);
					}

					if (propName === 'languages') {
						existProp.push(curValue as string);
					}
				}

				if (curKey === 'nativeName') {
					propName = 'nativeName';
					Object.entries(curValue).forEach((ar: [string, {common: string}]) => existProp.push(ar[1].common));
				}

				property.set(key, existProp);
			});
		}
	}

	return property;
}

export default function Country() {
	const {name: search} = useParams();

	const dataToFetch: TFetchData = {
		search: search!,
		base: `name/${search}`,
		queryKey: 'searchCountry',
		aditionalQuery: ',subregion,tld,currencies,languages,borders,area',
	};

	const {data, error, isFetching} = useQuery(fetchData<TBigData[]>(dataToFetch));

	if (isFetching) {
		return <Loader/>;
	}

	if (error instanceof AxiosError) {
		if (error.code === 'ERR_BAD_REQUEST') {
			return (
				<h1 style={{paddingLeft: '5%'}}>No results found</h1>
			);
		}

		console.log(error);

		return <PageError error={error} />;
	}

	const countryRawData = data![1] ?? data![0];

	const {
		borders,
		flags,
		name,
	} = countryRawData;

	const countryFltrdData = Array.from<TCountrySingleDesc>(refactor(countryRawData));

	return (
		<div className='country-container'>
			<BackButton />
			<div className='inner-country-container'>
				<img className='country-flag' src={flags?.svg} alt={name?.common} />
				<div className='country'>
					<h1>{name?.official ?? name?.common}</h1>
					<Description countryData={countryFltrdData} />
					<BorderCountries borders={borders} />
				</div>
			</div>

		</div>
	);
}

