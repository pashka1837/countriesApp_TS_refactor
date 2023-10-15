import { useQuery } from '@tanstack/react-query';
import {
  redirect, useLoaderData, useLocation, useNavigate, useSubmit,
} from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { customAxios } from '../../axios/customAxios';

import './Country.css';

function fetchData(name) {
  return {
    queryKey: ['searchCountry', name],
    queryFn: async () => {
      const query = '?fields=name,flags,population,capital,region,subregion,tld,currencies,languages,borders,area';
      const searchURL = `name/${name}${query}`;
      const { data } = await customAxios.get(searchURL);
      return data;
    },
  };
}

function getValues(obj) {
  if (!obj) return null;
  const valuesAr = [];
  for (const [key, value] of Object.entries(obj)) {
    if (typeof obj[key] === 'object') {
      for (const [key1, value1] of Object.entries(obj[key])) {
        if (key1 === 'name' || key1 === 'official') valuesAr.push(obj[key][key1]);
      }
    } else valuesAr.push(obj[key]);
  }
  return valuesAr.length ? valuesAr.join(', ') : null;
}

export function loader(queryClient) {
  return async ({ params }) => {
    const { name } = params;
    await queryClient.ensureQueryData(fetchData(name));
    return { name };
  };
}

export default function Country() {
  const { name } = useLoaderData();
  const { data } = useQuery(fetchData(name));
  const { state: srchPrms } = useLocation();
  const submit = useSubmit();
  const navigate = useNavigate();
  const {
    area, borders, capital,
    currencies: currencyOfCountry, flags, languages: languageOfCountry,
    name: nameOfCountry, population,
    region, subregion, tld,
  } = data[1] ?? data[0];

  const nativeName = getValues(nameOfCountry?.nativeName) || nameOfCountry.common;
  const currencies = getValues(currencyOfCountry) || 'uknown';
  const languages = getValues(languageOfCountry) || 'uknown';

  function handleBackButton() {
    const searchParams = new URLSearchParams();
    if (srchPrms) {
      searchParams.append('search', srchPrms);
      submit(searchParams, { method: 'get', action: '/' });
      return;
    }
    navigate('/');
  }

  return (
    <div className="country-container">
      <button onClick={handleBackButton} className="country-back-btn" type="button">
        <BiArrowBack />
        {'  '}
        Back
      </button>
      <div className="inner-country-container">
        <img className="country-flag" src={flags?.svg} alt={nameOfCountry?.common} />
        <div className="country">
          <h1>{nameOfCountry?.official || nameOfCountry?.common}</h1>

          <div className="country-desc">
            <div>
              <h5>
                Native Name:
                {' '}
                <span>{nativeName}</span>
              </h5>
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
                Sub Region:
                {' '}
                <span>{subregion}</span>
              </h5>
              <h5>
                Area:
                {' '}
                <span>
                  {area}
                  {' '}
                  sq km
                </span>
              </h5>
            </div>

            <div>
              <h5>
                Capital:
                {' '}
                <span>{capital?.[0]}</span>
              </h5>
              <h5>
                Top Level Domain:
                {' '}
                <span>{tld?.[0]}</span>
              </h5>
              <h5>
                Currencies:
                {' '}
                <span>{currencies}</span>
              </h5>
              <h5>
                Languages:
                {' '}
                <span>{languages}</span>
              </h5>
            </div>
          </div>

          <div className="border-countries-container">
            <h5>
              Border Countries:
              {' '}
            </h5>
            {borders.map((b, i) => (
              <span key={b} className="border-countries">
                {b}
                {' '}
              </span>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
