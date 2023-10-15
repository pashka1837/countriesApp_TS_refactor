import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CardList from '../../components/CardList/CardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import { customAxios } from '../../axios/customAxios';

function fetchData(name) {
  return {
    queryKey: ['search', name || 'all'],
    queryFn: async () => {
      const query = '?fields=name,flags,population,capital,region';
      const searchURL = (name && name !== 'all') ? `name/${name}${query}` : `all${query}`;
      const { data } = await customAxios.get(searchURL);
      return data;
    },
  };
}

export function loader(queryClient) {
  return async ({ request }) => {
    const url = new URL(request.url);
    const searchedName = url.searchParams.get('search');
    try {
      await queryClient.ensureQueryData(fetchData(searchedName));
      return { searchedName };
    } catch (error) {
      return { error };
    }
  };
}

export default function Landing() {
  const { searchedName, error } = useLoaderData();
  const [fltrdRegion, setFltrdRegion] = useState('All');
  const { data } = useQuery(fetchData(searchedName));
  const filteredResults = (fltrdRegion !== 'All') ? data.filter((d) => d.region === fltrdRegion) : data;

  return (
    <>
      <SearchForm setFltrdRegion={setFltrdRegion} fltrdRegion={fltrdRegion} searchedName={searchedName} />
      {error
        ? <h1 style={{ paddingLeft: '5%' }}>No results found</h1>
        : <CardList data={filteredResults} srchPrms={searchedName} />}
    </>
  );
}
