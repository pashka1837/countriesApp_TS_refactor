import {type TCountrySingleDesc} from '../../types/types';

export default function Description({countryData}: {countryData: TCountrySingleDesc[]}) {
	return (
		<div className='country-desc'>
			{countryData.map((d, i) => {
				const [key, value] = d;
				const name = key === 'tld' ? 'Top Level Domain' : key;
				const desc = value.join(', ');
				const area = key === 'area' ? <span>{' '}km<sup>2</sup></span> : null;
				return (
					<h5 key={name} className={i === 5 ? 'h5-desc' : ''} >
						{name}
						{': '}
						<span>{desc}{' '}{area}</span>
					</h5>
				);
			})}
		</div>
	);
}
