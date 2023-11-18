import { useContext } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import notFoundImgDark from '../../assets/not-found-404-dark.svg';
import notFoundImgLigth from '../../assets/not-found-404-dark-light.svg';
import './Error.css';

import { ThemeContext } from '../../context/GlobalContext';

export default function Error() {
  const { isDarkTheme } = useContext(ThemeContext);
  const error = useRouteError();
  return (
    <div className="error-container">
      <img src={isDarkTheme ? notFoundImgLigth : notFoundImgDark} alt="not found" />
      <div className="error-desc">
        <h2>Ooh... There is an Error!</h2>
        <p>
          {error.status}
          {' '}
          {error.error.message}
        </p>
      </div>
      <Link to="/">Link Back Home</Link>
    </div>
  );
}
