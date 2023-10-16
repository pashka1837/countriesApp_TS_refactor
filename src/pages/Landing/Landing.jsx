import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CardList from '../../components/CardList/CardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import { customAxios } from '../../axios/customAxios';

function filterData(region, data, error) {
  if (error) return null;
  return data.filter((d) => {
    if (region === 'All') return true;
    return d.region === region;
  });
}

function fetchData(name) {
  const search = name.trim().toLowerCase();
  return {
    queryKey: ['search', search],
    queryFn: async () => {
      const query = '?fields=name,flags,population,capital,region';
      const searchURL = (search && search !== 'all') ? `name/${search}${query}` : `all${query}`;
      const { data } = await customAxios.get(searchURL);
      return data;
    },
  };
}

export function loader(queryClient) {
  return async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || 'All';
    const region = url.searchParams.get('region') || 'All';
    try {
      await queryClient.ensureQueryData(fetchData(search));
      return { search, region };
    } catch (error) {
      return { error, search, region };
    }
  };
}

export default function Landing() {
  const { search, region, error } = useLoaderData();
  const [fltrdRegion, setFltrdRegion] = useState(region);
  const { data } = !error && useQuery(fetchData(search));
  const searchState = {
    search,
    region: fltrdRegion,
  };
  const filteredResults = useMemo(() => filterData(fltrdRegion, data, error), [fltrdRegion, data]);
  return (
    <>
      <SearchForm setFltrdRegion={setFltrdRegion} searchState={searchState} />
      {error
        ? <h1 style={{ paddingLeft: '5%' }}>No results found</h1>
        : <CardList data={filteredResults} searchState={searchState} />}
    </>
  );
}
