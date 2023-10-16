import { Form, useSubmit } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { useState } from 'react';
import './SearchForm.css';

export default function SearchForm({
  setFltrdRegion, searchState,
}) {
  const [isFlrtToggled, setIsFlrtToggled] = useState(true);
  const [isGrammaError, setIsGrammaError] = useState(false);
  const submit = useSubmit();
  const { search, region } = searchState;
  const regex = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|[0-9]/;

  const regionsAr = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const regionStyle = (reg, curReg) => ((reg === curReg) ? { textDecoration: 'underline' } : { textDecoration: 'none' });

  function handleFltr(choosenRegion) {
    setFltrdRegion(choosenRegion);
    setIsFlrtToggled(!isFlrtToggled);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputData = formData.get('search');
    if (inputData.match(regex)) {
      setIsGrammaError(true);
      return;
    }
    formData.set('region', region);
    submit(formData);
  }

  return (
    <div className="search-container">
      <Form className="search-form" onSubmit={handleSubmit}>
        <div className="search-field">
          <HiMagnifyingGlass />
          <input type="text" name="search" id="search" placeholder="Search for a country" defaultValue={search} />
        </div>
        {isGrammaError && <p className="gramma-error">Can not contain special characters or numbers</p>}
        <div className="filter-field">
          <div onClick={() => setIsFlrtToggled(!isFlrtToggled)} className="buttonToggle">
            <p>Filter by Region</p>
            {isFlrtToggled ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
          </div>
          <div className={isFlrtToggled ? 'filter-popUp' : 'filter-popUp active'}>
            {regionsAr.map((r) => <p key={r} onClick={() => handleFltr(r)} style={regionStyle(r, region)}>{r}</p>)}
          </div>
        </div>
      </Form>
    </div>
  );
}
