import { IonCard, IonCardContent } from '@ionic/react';
import './SingleCard.css';
import { redirect, useNavigate } from 'react-router-dom';

export default function SingleCard({
  capital, flags, name, population, region, srchPrms,
}) {
  const navigate = useNavigate();

  function handleClick() {
    // const searchParams = new URLSearchParams();
    // console.log(Object.entries(srchPrms));
    // searchParams.append('search', '1');
    // searchParams.append('search2', '2');
    // const res = new Response(searchParams);
    // return redirect('/some');
    navigate(`/country/${name.common}`, { state: srchPrms });
  }

  return (
    <IonCard onClick={handleClick} className="country-card">
      <img className="country-card-flag" alt={name.common} src={flags?.svg} />
      <IonCardContent>
        <div className="country-card-desc">
          <h1 className="country-card-name">{name.common}</h1>
          <h5>
            Population:
            {' '}
            <span>{population}</span>
          </h5>
          <h5>
            Region:
            {' '}
            <span>{region}</span>
          </h5>
          <h5>
            Capital:
            {' '}
            <span>{capital?.[0]}</span>
          </h5>
        </div>
      </IonCardContent>
    </IonCard>
  );
}
