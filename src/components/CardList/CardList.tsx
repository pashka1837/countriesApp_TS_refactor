import {type RootState} from '../../store';
import filterData from '../../utils/filterData';
import SingleCard from '../SingleCard/SingleCard';
import {useSelector} from 'react-redux';
import './CardList.scss';

export default function CardList() {
	const {countries, region} = useSelector((store: RootState) => store.countryApp);

	const filteredCountries = filterData(region, countries);

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
