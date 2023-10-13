import { IonCard, IonCardContent } from '@ionic/react';
import './SingleCard.css';
import { useNavigate } from 'react-router-dom';

export default function SingleCard({
  capital, flags, name, population, region,
}) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/country/:${name.common}`);
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
