import { Link, useRouteError } from 'react-router-dom';
import { useContext } from 'react';
import notFoundImgDark from '../../assets/not-found-404-dark.svg';
import notFoundImgLigth from '../../assets/not-found-404-dark-light.svg';
import { ThemeContext } from '../../context/GlobalContext';

export default function PageError() {
  const { isDarkTheme } = useContext(ThemeContext);
  const error = useRouteError().data;
  return (
    <div style={{ height: '90dvh' }} className="error-container">
      <img src={isDarkTheme ? notFoundImgLigth : notFoundImgDark} alt="not found" />
      <div className="error-desc">
        <h2>Ooh... There is an Error!</h2>
        <p>
          {error.response.status}
          {' '}
          {error.message}
        </p>
      </div>
      <Link to="/">Link Back Home</Link>
    </div>
  );
}
