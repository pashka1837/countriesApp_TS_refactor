import './App.css';
import '@ionic/react/css/core.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Landing, { loader as landingPageLoader } from './pages/Landing/Landing';
import Country, { loader as countryPageLoader } from './pages/Country/Country';
import Error from './pages/Error/Error';
import HomeLayout from './pages/HomeLayout/HomeLayout';
import PageError from './pages/PageError/PageError';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

setupIonicReact();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: landingPageLoader(queryClient),
        element: <Landing />,
        errorElement: <PageError />,
      },

      {
        path: 'country/:name',
        loader: countryPageLoader(queryClient),
        element: <Country />,
        errorElement: <PageError />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
