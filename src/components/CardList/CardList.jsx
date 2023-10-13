import SingleCard from '../SingleCard/SingleCard';

import './CardList.css';

export default function CardList({ data }) {
  if (!data) return <h2>loading...</h2>;

  return (
    <div className="countries-container">
      {data.map((d) => {
        const { name } = d;
        return <SingleCard key={name.common} {...d} />;
      })}
    </div>
  );
}
