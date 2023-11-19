export default function BorderCountries({borders}: {borders: string[]}) {
	return (
		<div className='border-countries-container'>
			<h5>Border Countries:</h5>
			{borders.length
				? borders.map(b => (
					<span key={b} className='border-countries'>{b}</span>
				))
				: <span className='border-countries'>None</span>}
		</div>
	);
}
