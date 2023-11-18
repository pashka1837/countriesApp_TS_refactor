import './App.css';
import '@ionic/react/css/core.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {setupIonicReact} from '@ionic/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Landing, {loader as landingPageLoader} from './pages/Landing/Landing';
import Country, {loader as countryPageLoader} from './pages/Country/Country';
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
		// ErrorElement: <Error />,
		children: [
			{
				index: true,
				// Loader: landingPageLoader(queryClient),
				element: <Landing />,
				// ErrorElement: <PageError />,
			},
			{
				path: 'country/:name',
				loader: countryPageLoader(queryClient),
				element: <Country />,
				// ErrorElement: <PageError />,
			},
		],
	},
]);

const App = (): JSX.Element => (
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
);

export default App;
