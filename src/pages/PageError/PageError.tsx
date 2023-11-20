import {Link, useRouteError} from 'react-router-dom';
import notFoundImgDark from '../../assets/not-found-404-dark.svg';
import notFoundImgLigth from '../../assets/not-found-404-dark-light.svg';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../store';
import {type AxiosError} from 'axios';
import {changeSearchState} from '../../feature/themeSlice';

export default function PageError() {
	const dispatch = useDispatch();

	const {isDark} = useSelector((store: RootState) => store.countryApp);
	const error = useRouteError() as AxiosError;

	function handleBackHome() {
		dispatch(changeSearchState({search: 'all', region: 'All'}));
	}

	return (
		<div style={{height: '90dvh'}} className='error-container'>
			<img src={isDark ? notFoundImgLigth : notFoundImgDark} alt='not found' />
			<div className='error-desc'>
				<h2>Ooh... There is an Error!</h2>
				<p>
					{error.message}
				</p>
			</div>
			<Link to={'/'} onClick={handleBackHome}>Link Back Home</Link>
		</div>
	);
}
