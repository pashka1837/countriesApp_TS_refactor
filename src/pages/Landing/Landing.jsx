import { useQuery } from '@tanstack/react-query';
import CardList from '../../components/CardList/CardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import { customAxios } from '../../axios/customAxios';
import './Landing.css';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function fetchData(name) {
  return {
    queryKey: ['search', name || 'all'],
    queryFn: async () => {
      const query = '?fields=name,flags,population,capital,region';
      const searchURL = name ? `name/${name}${query}` : `all${query}`;
      const { data } = await customAxios.get(searchURL);
      return data;
    },
  };
}

export function loader(queryClient) {
  return async ({ request }) => {
    const url = new URL(request.url);
    const searchedName = url.searchParams.get('search') || '';
    try {
      await queryClient.ensureQueryData(fetchData(searchedName));
      return { searchedName };
    } catch (error) { return { error }; }

    // return { searchedName };
  };
}

export default function Landing() {
  const { searchedName, error } = useLoaderData() || '';
  // const [srchPrms, setSrchPrms] = useState(searchedName || '');
  const [fltrdRegion, setFltrdRegion] = useState(null);
  const {
    isLoading, data, isError, error: axiosError,
  } = useQuery(fetchData(searchedName));
  const filteredResults = fltrdRegion ? data.filter((d) => d.region === fltrdRegion) : data;
  console.log(filteredResults);
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <SearchForm setFltrdRegion={setFltrdRegion} />
      {isLoading
        ? <h2>loading..</h2>
        : <CardList data={filteredResults} srchPrms={searchedName} />}

    </div>
  );
}
