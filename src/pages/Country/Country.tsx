
import {useParams} from 'react-router-dom';

import {useQuery} from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import {BackButton, Description, BorderCountries} from './index.ts';

import fetchData from '../../utils/fetchQuery';
import {type TCountrySingleDesc, type TBigData, type TFetchData, type TCurrency, type TNativeName} from '../../types/types';
import './Country.css';

// Function refactor(obj: Omit<TBigData, 'flags'>): TCountryFltrdD {
// 	const property = new Map();
// 	for (const [key, value] of Object.entries(obj)) {
// 		if (key === 'flags' || key === 'borders') {
// 			continue;
// 		} else if (typeof value !== 'object') {
// 			property.set(key, [value]);
// 		} else if (Array.isArray(value)) {
// 			property.set(key, [...value]);
// 		} else {
// 			for (const [key1, value1] of Object.entries(value)) {
// 				if (key === 'currencies') {
// 					property.set(key, [...property.get(key) || [], value1.name]);
// 				}

// 				if (key === 'languages') {
// 					property.set(key, [...property.get(key) || [], value1]);
// 				}

// 				if (key === 'name') {
// 					if (key1 !== 'nativeName') {
// 						continue;
// 					}

// 					for (const [keyN, valueN] of Object.entries(value1)) {
// 						property.set('native name', [...property.get('native name') || [], valueN.common]);
// 					}
// 				}
// 			}
// 		}
// 	}

// 	return property;
// }
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
			Object.entries(value).forEach((ar: [string, string | TNativeName | TCurrency]) => {
				const curKey = ar[0];
				const curValue = ar[1];
				let propName = key;
				let existProp: string[] = [];
				if (propName !== 'name') {
					existProp = property.get(key) ?? [];
					if (propName === 'currencies') {
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

			// For (const [key1, value1] of Object.entries(value)) {
			// 	let propName = key;
			// 	let existProp: string[] = [];
			// 	if (propName !== 'name') {
			// 		existProp = property.get(key) ?? [];
			// 		if (propName === 'currencies') {
			// 			existProp.push(value1.name as string);
			// 		}

			// 		if (propName === 'languages') {
			// 			existProp.push(value1 as string);
			// 		}
			// 	}

			// 	if (key1 === 'nativeName') {
			// 		 propName = 'nativeName';
			// 		Object.entries(value1).forEach(ar => existProp.push(ar[1].common));
			// 	}

			// 	property.set(key, existProp);
			// }
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

	const {data, isError, isLoading} = useQuery(fetchData<TBigData[]>(dataToFetch));

	if (isLoading) {
		return <Loader/>;
	}

	if (isError) {
		return <h1 style={{paddingLeft: '5%'}}>No results found</h1>;
	}

	const countryRawData = data[1] ?? data[0];
	console.log(countryRawData);
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
