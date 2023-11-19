import {useNavigate} from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';

export default function BackButton() {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				navigate('/');
			}} className='country-back-btn'
			type='button'>
			<BiArrowBack />
			{'  '}Back
		</button>
	);
}
