import { Injectable } from '@nestjs/common';
import { Meilisearch, MeiliSearch } from 'meilisearch';
import * as ora from 'ora';
import { ConfigManagerService } from 'src/config-manager/config-manager.service';
import { NanoId } from 'src/etc/nanoid';
import { MeilisearchConfig } from 'src/etc/types/config-manager';
import {
	MeilisearchArtistDocument,
	MeilisearchSearchArtistsQueryDto,
	MeilisearchSearchArtistsResponseDto
} from './dto/meilisearch.dto';

@Injectable()
export class MeilisearchServiceDelegate {
	private readonly meilisearchConfig: MeilisearchConfig;
	private readonly client: Meilisearch;
	constructor(private configManagerService: ConfigManagerService) {
		this.meilisearchConfig = configManagerService.initMeilisearchConfig();
		this.client = new MeiliSearch({
			host: this.meilisearchConfig.host,
			apiKey: this.meilisearchConfig.apiKey
		});
	}

	searchArtists = async (
		meilisearchSearchArtistsQueryDto: MeilisearchSearchArtistsQueryDto
	): Promise<MeilisearchSearchArtistsResponseDto> => {
		return this.client
			.index(this.meilisearchConfig.artistsIndex)
			.search(meilisearchSearchArtistsQueryDto.q, {
				showRankingScore: true,
				hitsPerPage: 10,
				page: 1
			});
	};

	upsertArtists = (artists: MeilisearchArtistDocument[]) => {
		this.uploadInChunks(artists, this.meilisearchConfig.artistsIndex);
	};

	removeArtist = (artistUid: NanoId) => {
		this.client
			.index(this.meilisearchConfig.artistsIndex)
			.deleteDocument(artistUid);
	};

	private uploadInChunks = async (data: Array<any>, index: string) => {
		const isDev = this.configManagerService.generalConfig.env === 'dev';
		let spinner: ora.Ora;
		if (isDev) {
			console.log(
				`Inserting ${data.length} documents to meilisearch index: ${index}`
			);
			spinner = ora('Uploading data to Meilisearch').start();
		}

		const chunkSize = 10000;
		const totalChunks = Math.ceil(data.length / chunkSize);
		for (let i = 0; i < data.length; i += chunkSize) {
			const chunk = data.slice(i, i + chunkSize);
			const chunkNumber = Math.floor(i / chunkSize) + 1;

			if (isDev) {
				spinner.start(
					`Uploading chunk ${chunkNumber}/${totalChunks} (${chunk.length})`
				);
			}

			await this.client.index(index).addDocuments(chunk);

			if (isDev) {
				spinner.succeed(`Uploaded chunk ${chunkNumber}/${totalChunks}`);
			}
		}
	};
}
