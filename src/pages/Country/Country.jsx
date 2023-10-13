import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useLocation } from 'react-router-dom';
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
  console.log(data);
  const {
    area, borders, capital,
    currencies: currencyOfCountry, flags, languages: languageOfCountry,
    name: nameOfCountry, population,
    region, subregion, tld,
  } = data[0];

  const nativeName = getValues(nameOfCountry?.nativeName) || nameOfCountry.common;
  const currencies = getValues(currencyOfCountry) || 'uknown';
  const languages = getValues(languageOfCountry) || 'uknown';
  const borderCountries = borders.length ? borders.join(', ') : 'uknown';
  // const nativeNameKeys = Object.keys(nameOfCountry?.nativeName);
  // const nativeName = nativeNameKeys.length ? nameOfCountry.nativeName[`${nativeNameKeys[0]}`].official : nameOfCountry.common;
  // const languageKeys = Object.keys(languageOfCountry);
  // console.log(Object.values(languageOfCountry));
  // console.log('objnames', nativeNameKeys);
  return (
    <div className="country-container">
      <button type="button">back</button>
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
          <h5>
            Border Countries: :
            {' '}
            <span>{borderCountries}</span>
          </h5>

        </div>
      </div>

    </div>
  );
}
