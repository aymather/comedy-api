import type { Filter } from 'bad-words';

let profanityFilter: Filter;

const dynamicImport = async (packageName: string) =>
	new Function(`return import('${packageName}')`)();

export async function initDynamicImports() {
	if (!profanityFilter) {
		const { Filter } = await dynamicImport('bad-words');
		profanityFilter = new Filter();
	}
}

export const getProfanityFilter = () => profanityFilter;
