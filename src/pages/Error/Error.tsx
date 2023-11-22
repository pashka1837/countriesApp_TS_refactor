
import {Link, useRouteError} from 'react-router-dom';
import notFoundImgDark from '../../assets/not-found-404-dark.svg';
import notFoundImgLigth from '../../assets/not-found-404-dark-light.svg';
import {useDispatch, useSelector} from 'react-redux';
import {changeSearchState} from '../../feature/themeSlice';

import {type RootState} from '../../store';

import './Error.css';

export default function Error() {
	const {isDark} = useSelector((store: RootState) => store.countryApp);
	const dispatch = useDispatch();

	function handleBackHome() {
		dispatch(changeSearchState({search: 'all', region: 'All'}));
	}

	const error = useRouteError() as string;
	console.log(error);
	return (
		<div className='error-container'>
			<img src={isDark ? notFoundImgLigth : notFoundImgDark} alt='not found' />
			<div className='error-desc'>
				<h2>Ooh... There is an Error!</h2>
				<p>Some Error happend :(</p>
			</div>
			<Link to='/' onClick={handleBackHome}>Link Back Home</Link>
		</div>
	);
}
