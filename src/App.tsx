import './App.css';
import '@ionic/react/css/core.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {setupIonicReact} from '@ionic/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Landing, {loader as landingPageLoader} from './pages/Landing/Landing';
import Country from './pages/Country/Country';
import Error from './pages/Error/Error';
import HomeLayout from './pages/HomeLayout/HomeLayout';
import PageError from './pages/PageError/PageError';
import {store} from './store';

const queryClient: QueryClient = new QueryClient({
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
				loader: landingPageLoader(queryClient, store.getState()),
				element: <Landing />,
				errorElement: <PageError />,
			},
			{
				path: 'country/:name',
				// Loader: countryPageLoader(queryClient),
				element: <Country />,
				// ErrorElement: <PageError />,
			},
		],
	},
]);

const App = () => (
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
);

export default App;
