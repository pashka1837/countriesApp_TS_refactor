import SingleCard from '../SingleCard/SingleCard';
import './CardList.css';

export default function CardList({
  data, searchState,
}) {
  return (
    <div className="countries-container">
      {data.map((d) => {
        const { name } = d;
        return <SingleCard key={name.common} {...d} searchState={searchState} />;
      })}
    </div>
  );
}
