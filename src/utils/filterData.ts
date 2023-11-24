import {type TSmallData} from '../types/types';

export default function filterData(region: string, data: TSmallData[] | undefined): TSmallData[] {
	return data!.filter(d => {
		if (region === 'All') {
			return true;
		}

		return d.region === region;
	});
}
