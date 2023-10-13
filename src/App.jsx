import './App.css';
import '@ionic/react/css/core.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Landing, { loader as landingPageLoader } from './pages/Landing/Landing';
import Country from './pages/Country/Country';
import HomeLayout from './pages/HomeLayout/HomeLayout';

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
    children: [
      {
        index: true,
        loader: landingPageLoader(queryClient),
        element: <Landing />,
      },

      {
        path: 'country/:name',
        element: <Country />,
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
