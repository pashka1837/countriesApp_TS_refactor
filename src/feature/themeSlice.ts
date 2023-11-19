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

function filterData(region: string, data: TSmallData[] | undefined): TSmallData[] {
	return data!.filter(d => {
		if (region === 'All') {
			return true;
		}

		return d.region === region;
	});
}

export type CounterState = {
	isDark: boolean;
	searchState: TSearchState;
	countries: TSmallData[];
};

const initialState: CounterState = {
	isDark: checkUserTheme(),
	searchState: {
		search: 'all',
	    region: 'All',
	},
	countries: [],
};

const countrySlice = createSlice({
	name: 'countryApp',
	initialState,
	reducers: {
		setCountries(state, action: PayloadAction<TSmallData[]>) {
			console.log(action.payload);
			state.countries = action.payload;
		},
		changeAppTheme(state) {
	        document.body.classList.toggle('dark', !state.isDark);
			localStorage.setItem('isDarkTheme', `${!state.isDark}`);
			state.isDark = !state.isDark;
		},
		changeSearchState(state, action: PayloadAction<TSearchState>) {
			const {search, region} = action.payload;
			state.searchState.region = region;
			state.searchState.search = search;
		},

	},
});

export default countrySlice.reducer;
export const {changeAppTheme, changeSearchState, setCountries} = countrySlice.actions;
