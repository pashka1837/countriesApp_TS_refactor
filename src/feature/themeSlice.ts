/* eslint-disable no-mixed-spaces-and-tabs */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {type TSmallData, type TSearchState} from '../types/types';

function checkUserTheme(): boolean {
	const savedTheme = localStorage.getItem('isDarkTheme') === 'true';
	const isDarkTheme = savedTheme ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
	document.body.classList.toggle('dark', isDarkTheme);
	localStorage.setItem('isDarkTheme', `${isDarkTheme}`);
	return isDarkTheme;
}

export type CounterState = {
	isDark: boolean;
	search: string;
	region: string;
	countries: TSmallData[];
};

const initialState: CounterState = {
	isDark: checkUserTheme(),
	search: 'all',
	region: 'All',
	countries: [],
};

const countrySlice = createSlice({
	name: 'countryApp',
	initialState,
	reducers: {
		setCountries(state, action: PayloadAction<TSmallData[]>) {
			state.countries = action.payload;
		},
		changeAppTheme(state) {
	        document.body.classList.toggle('dark', !state.isDark);
			localStorage.setItem('isDarkTheme', `${!state.isDark}`);
			state.isDark = !state.isDark;
		},
		changeSearchState(state, action: PayloadAction<TSearchState>) {
			const {search, region} = action.payload;
			state.region = region;
			state.search = search;
		},
		changeSearch(state, action: PayloadAction<string>) {
			const search = action.payload;
			state.search = search;
		},
		changeRegion(state, action: PayloadAction<string>) {
			const region = action.payload;
			state.region = region;
		},

	},
});

export default countrySlice.reducer;
export const {changeAppTheme, changeSearchState, changeSearch, setCountries, changeRegion} = countrySlice.actions;
