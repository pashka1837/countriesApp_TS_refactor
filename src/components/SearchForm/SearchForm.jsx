import { Form } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import './SearchForm.css';
import { useEffect, useRef, useState } from 'react';

export default function SearchForm({ setFltrdRegion, fltrdRegion, searchedName }) {
  const [isFlrtToggled, setIsFlrtToggled] = useState(true);
  const popUpElRef = useRef();
  useEffect(() => {
    const regionsAr = [...popUpElRef.current.children];
    regionsAr.forEach((el) => {
      el.style.textDecoration = 'none';
      if (el.innerText === fltrdRegion)el.style.textDecoration = 'underline';
    });
  }, [fltrdRegion]);

  function handleToggle(e) {
    setIsFlrtToggled(!isFlrtToggled);
  }

  function handleFltr(e) {
    if (e.currentTarget === e.target) return;
    const curEl = e.target;
    setFltrdRegion(curEl.innerText);
  }

  return (
    <div className="search-container">
      <Form className="search-form">
        <div className="search-field">
          <HiMagnifyingGlass />
          <input type="search" name="search" id="search" placeholder="Search for a country" defaultValue={searchedName} />
        </div>
        <div className="filter-field">
          <div onClick={handleToggle} className="buttonToggle">
            <p>Filter by Region</p>
            {isFlrtToggled ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
          </div>
          <div ref={popUpElRef} onClick={handleFltr} className={isFlrtToggled ? 'filter-popUp' : 'filter-popUp active'}>
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
