import { Outlet, useNavigation } from 'react-router-dom';
import { IonSpinner } from '@ionic/react';
import Navbar from '../../components/Navbar/Navbar';

export default function HomeLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <>
      <Navbar />
      {isLoading
        ? (
          <div className="loader">
            <IonSpinner name="crescent" />
          </div>
        )
        : <Outlet />}
    </>
  );
}
