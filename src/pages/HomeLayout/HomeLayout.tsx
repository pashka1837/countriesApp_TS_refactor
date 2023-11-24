import {Outlet, useNavigation} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Loader from '../../components/Loader/Loader';

export default function HomeLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';
	return (
		<>
			<Navbar />
			{isLoading
				? <Loader />
				: <Outlet />}
		</>
	);
}
