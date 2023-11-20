import {Form} from 'react-router-dom';
import {HiMagnifyingGlass} from 'react-icons/hi2';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {changeSearchState} from '../../feature/themeSlice';
import {type RootState} from '../../store';
import {type FormEvent, useState} from 'react';
import './SearchForm.css';

export default function SearchForm() {
	const {search, region} = useSelector((store: RootState) => store.countryApp.searchState);

	const dispatch = useDispatch();

	const [isFlrtToggled, setIsFlrtToggled] = useState(true);
	const [isGrammaError, setIsGrammaError] = useState(false);

	const regex = /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|,|\.|>|\?|\/|""|;|:|[0-9]\s+$/;

	const regionsAr = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
	const regionStyle = (reg: string, curReg: string) => ((reg === curReg) ? {textDecoration: 'underline'} : {textDecoration: 'none'});

	function handleFltr(curRegion: string) {
		dispatch(changeSearchState({search, region: curRegion}));
		setIsFlrtToggled(!isFlrtToggled);
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		let inputSearch = formData.get('search') as string;
		if (!inputSearch) {
			return;
		}

		inputSearch = inputSearch.trim().toLowerCase();
		if (regex.exec(inputSearch)) {
			setIsGrammaError(true);
			return;
		}

		dispatch(changeSearchState({search: inputSearch, region}));
	}

	return (
		<div className='search-container'>
			<Form className='search-form' onSubmit={handleSubmit}>
				<div className='search-field'>
					<HiMagnifyingGlass />
					<input type='text' name='search' id='search' placeholder='Search for a country' defaultValue={search} />
				</div>
				{isGrammaError && <p className='gramma-error'>Can not contain special characters or numbers</p>}
				<div className='filter-field'>
					<div onClick={() => {
						setIsFlrtToggled(!isFlrtToggled);
					}} className='buttonToggle'>
						<p>Filter by Region</p>
						{isFlrtToggled ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
					</div>
					<div className={isFlrtToggled ? 'filter-popUp' : 'filter-popUp active'}>
						{regionsAr.map(curRegion => <p key={curRegion} onClick={() => {
							handleFltr(curRegion);
						}} style={regionStyle(curRegion, region)}>{curRegion}</p>)}
					</div>
				</div>
			</Form>
		</div>
	);
}
