import {type RootState} from '../../store';
import SingleCard from '../SingleCard/SingleCard';
import './CardList.css';
import {useSelector} from 'react-redux';
import {type TSmallData} from '../../types/types';

function filterData(region: string, data: TSmallData[] | undefined): TSmallData[] {
	return data!.filter(d => {
		if (region === 'All') {
			return true;
		}

		return d.region === region;
	});
}

export default function CardList() {
	const {countries, searchState} = useSelector((store: RootState) => store.countryApp);

	const filteredCountries = filterData(searchState.region, countries);

	if (!filteredCountries.length) {
		return (<h1 style={{paddingLeft: '5%'}}>No results found</h1>);
	}

	return (
		<div className='countries-container'>
			{filteredCountries.map(country => {
				const {name} = country;
				return <SingleCard key={name.common} {...country} />;
			})}
		</div>
	);
}
