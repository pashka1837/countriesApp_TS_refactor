import { useQuery } from '@tanstack/react-query';
import CardList from '../../components/CardList/CardList';
import SearchForm from '../../components/SearchForm/SearchForm';
import { customAxios } from '../../axios/customAxios';
import './Landing.css';
import { useState } from 'react';

function fetchData(region) {
  return {
    queryKey: ['search', region || 'all'],
    queryFn: async () => {
      const query = '?fields=name,flags,population,capital,region';
      const searchURL = region ? `region${region && (`/${region}`)}${query}` : `all${query}`;
      const { data } = await customAxios.get(searchURL);
      return data;
    },
  };
}

export function loader(queryClient) {
  return async ({ params }) => {
    console.log(params);
    await queryClient.ensureQueryData(fetchData());
    return null;
  };
}

export default function Landing() {
  const [srchPrms, setSrchPrms] = useState({ name: '', region: '' });
  const { data } = useQuery(fetchData());
  return (
    <div style={{ marginTop: '10vh' }}>
      <SearchForm />
      <CardList data={data} srchPrms={srchPrms} />
    </div>
  );
}
