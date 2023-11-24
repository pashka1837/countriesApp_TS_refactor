import './Navbar.scss';
import {LuFlashlightOff, LuFlashlight} from 'react-icons/lu';
import {useDispatch, useSelector} from 'react-redux';
import {type RootState} from '../../store';
import {changeAppTheme} from '../../feature/themeSlice';

const Navbar = () => {
	const isDark = useSelector((store: RootState) => store.countryApp.isDark);
	const dispatch = useDispatch();
	return (
		<nav>
			<h3 className='logo'>Where in the world?</h3>
			<div className='switch-theme-container'>
				<button onClick={() => dispatch(changeAppTheme())} className='switch-theme-btn' type='button'>
					{(isDark)
						? <><LuFlashlight className='moon-icon'/> <span>Light Mode</span></>
						: <><LuFlashlightOff className='moon-icon'/> <span>Dark Mode</span></>
					}
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
