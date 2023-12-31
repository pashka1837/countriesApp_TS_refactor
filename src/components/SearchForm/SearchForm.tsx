import {Form} from 'react-router-dom';
import {HiMagnifyingGlass} from 'react-icons/hi2';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {changeRegion, changeSearch} from '../../feature/themeSlice';
import {type RootState} from '../../store';
import {type FormEvent, useState} from 'react';
import {inputRegex} from '../../utils/regex';
import './SearchForm.scss';

export default function SearchForm() {
	const {search, region} = useSelector((store: RootState) => store.countryApp);

	const dispatch = useDispatch();

	const [isFlrtToggled, setIsFlrtToggled] = useState(true);
	const [isGrammaError, setIsGrammaError] = useState(false);

	const regionsAr = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
	const regionStyle = (reg: string, curReg: string) => ((reg === curReg) ? {textDecoration: 'underline'} : {textDecoration: 'none'});

	function handleFltr(curRegion: string) {
		setIsFlrtToggled(!isFlrtToggled);
		dispatch(changeRegion(curRegion));
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		let inputSearch = formData.get('search') as string;
		if (!inputSearch) {
			return;
		}

		inputSearch = inputSearch.trim().toLowerCase();
		if (inputRegex.exec(inputSearch)) {
			setIsGrammaError(true);
			return;
		}

		dispatch(changeSearch(inputSearch));
	}

	return (
		<div className='search-container'>
			<Form className='search-form' onSubmit={handleSubmit}>
				<div className='search-field'>
					<HiMagnifyingGlass />
					<input
						type='text'
						name='search'
						id='search' placeholder={search} />
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
						{regionsAr.map(curRegion => <p key={curRegion}
							onClick={() => {
								handleFltr(curRegion);
							}}
							style={regionStyle(curRegion, region)}>{curRegion}</p>)}
					</div>
				</div>
			</Form>
		</div>
	);
}
