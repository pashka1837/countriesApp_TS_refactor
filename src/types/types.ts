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
		nativeName?: Record<string, unknown>;
		oficial?: string;
	};
	population?: number;
	region: string;
};
