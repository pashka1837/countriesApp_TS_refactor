import { Form } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import './SearchForm.css';
import { useState } from 'react';

MdOutlineKeyboardArrowDown;

export default function SearchForm({ setFltrdRegion }) {
  const [isFlrtToggled, setIsFlrtToggled] = useState(true);

  function handleFltr(e) {
    if (e.target === e.currentTarget) return;
    const region = e.target.innerText;
    if (region === 'All') {
      setFltrdRegion(null);
      return;
    }
    setFltrdRegion(region);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (e.key === 'Enter') {
  //     console.log(e);
  //   }
  //   console.log(e);
  // }

  return (
    <div className="search-container">
      <Form className="search-from">
        <div className="search-field">
          <HiMagnifyingGlass />
          <input type="search" name="search" id="search" placeholder="Search for a country" />
        </div>
        <div onClick={() => setIsFlrtToggled(!isFlrtToggled)} className="filter-field">
          <p>Filter by Region</p>
          <MdOutlineKeyboardArrowDown />
          <div onClick={handleFltr} className={isFlrtToggled ? 'filter-popUp' : 'filter-popUp active'}>
            <p>All</p>
            <p>Africa</p>
            <p>Americas</p>
            <p>Asia</p>
            <p>Europe</p>
            <p>Oceania</p>
          </div>
        </div>
      </Form>
    </div>
  );
}
