import axios from 'axios';
import { LaughFactoryEvent } from '../types';

export const gatherEvents = async (): Promise<LaughFactoryEvent[]> => {
	let page = 1;
	const config = {
		headers: {
			Host: 'tixr.com',
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:137.0) Gecko/20100101 Firefox/137.0',
			Accept: 'application/json, text/javascript, */*; q=0.01',
			'Accept-Language': 'en-US,en;q=0.5',
			'Accept-Encoding': 'gzip, deflate, br, zstd',
			'X-NewRelic-ID': 'Ug8CWVVXGwcEUlFVDwM=',
			'X-Requested-With': 'XMLHttpRequest',
			Connection: 'keep-alive',
			Referer: 'https://www.tixr.com/groups/laughfactoryhw',
			// Cookie:
			// 'queryParams={"eventId":{"expiration":1747105408124,"value":"134120"}}; datadome=8vtQ6Vl6YdagQPssVezXioNSH~~hpaxdGNmn1k9upjDE6Uk2X2aeXwBSutsUxHv7Hmuuie1m9PQj2WwtifDIV1ZeQPrzTyRKnNikgemr1y~6Hu9BHwCMjZbVnfTTRI3F; allow_functional_cookies=1; allow_analytics_cookies=1; allow_marketing_cookies=1; fbm_508778472517036=base_domain=.tixr.com; __stripe_mid=3aeac745-8e09-4e65-a388-7e033b7eff20563481; tsession=M2VhYzVkNTktMjAyNC00ZGEzLTg2ZTMtMGU0ZGUzZGJiOGI3; ULIN=1',
			'Sec-Fetch-Dest': 'empty',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Site': 'same-origin',
			TE: 'trailers'
		}
	};

	let events: LaughFactoryEvent[] = [];
	let response;

	do {
		response = await axios.get(
			`https://www.tixr.com/api/groups/717/events?page=${page}`,
			config
		);
		events = [...events, ...response.data];
		page += 1;
	} while (response.data.length > 0);

	return events;
};
