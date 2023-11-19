import {IonSpinner} from '@ionic/react';

export default function Loader() {
	return (
		<div className='loader'>
			<IonSpinner name='crescent' />
		</div>
	);
}
