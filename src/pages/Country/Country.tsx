import {
	useLoaderData, useLocation, useSubmit, json,
} from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';
import {useMemo} from 'react';
import {customAxios} from '../../axios/customAxios';

import './Country.css';

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

function fetchData(name) {
	return {
		queryKey: ['searchCountry', name],
		async queryFn() {
			const query = '?fields=name,flags,population,capital,region,subregion,tld,currencies,languages,borders,area';
			const searchURL = `name/${name}${query}`;
			const {data} = await customAxios.get(searchURL);
			return data;
		},
	};
}

export function loader(queryClient) {
	return async ({params}) => {
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
	const {data} = useLoaderData();
	const {state} = useLocation();
	const submit = useSubmit();

	const {
		borders,
		flags,
		name: nameOfCountry,
	} = data[1] ?? data[0];

	const refactorData = useMemo(() => Array.from(refactor(data[1] || data[0])), [data]);

	function handleBackButton() {
		const searchParams = new URLSearchParams();
		searchParams.append('search', state.search);
		searchParams.append('region', state.region);
		submit(searchParams, {method: 'get', action: '/'});
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
