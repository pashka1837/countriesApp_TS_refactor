import {configureStore} from '@reduxjs/toolkit';
import countrySliceReducer from './feature/themeSlice';

export const store = configureStore({
	reducer: {
		countryApp: countrySliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

