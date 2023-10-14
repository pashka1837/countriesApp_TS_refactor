import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function HomeLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <>
      <Navbar />
      {
        isLoading
          ? <h2>Loading..</h2>
          : <Outlet />
      }

    </>
  );
}
