/* eslint-disable @typescript-eslint/naming-convention */
export type TSearchState = {
	search: string;
	region: string;
};

export type TSmallData = {
	capital: string[];
	flags: {
		alt?: string;
		png?: string;
		svg?: string;
	};
	name: {
		common?: string;
		nativeName?: TNativeName;
		oficial?: string;
	};
	population?: number;
	region: string;
};
export type TNativeName = Record<string, {
	common: string;
	official: string;
}>;
export type TCurrency = {
	name: string;
	symbol: string;
};
type TLanguages = Record<string, string>;
export type TCurrencies = Record<string, TCurrency>;

export type TBigData = {
	area: number;
	borders: string[];
	currencies: TCurrencies;
	capital: string[];
	flags: {
		alt?: string;
		png?: string;
		svg?: string;
	};
	languages: TLanguages;
	name: {
		common: string;
		nativeName: TNativeName;
		official: string;
	};
	population?: number;
	region: string;
	subregion: string;
	tld: string[] | string;
};

export type TFetchData = {
	search: string ;
	base: string;
	queryKey: string;
	aditionalQuery?: string;
};

export type TCountrySingleDesc = [string, string[]];
