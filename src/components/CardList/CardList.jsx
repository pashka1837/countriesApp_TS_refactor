import SingleCard from '../SingleCard/SingleCard';

import './CardList.css';

export default function CardList({ data, srchPrms }) {
  return (
    <div className="countries-container">
      {data.map((d) => {
        const { name } = d;
        return <SingleCard key={name.common} {...d} srchPrms={srchPrms} />;
      })}
    </div>
  );
}
