import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHostBodyDto, CreateHostResponseDto } from './dto/create.dto';
import { DeleteHostParamsDto, DeleteHostResponseDto } from './dto/delete.dto';
import { PublicHost } from './dto/entity.dto';
import { FindAllHostResponseDto } from './dto/find-all.dto';
import {
	FindOneHostParamsDto,
	FindOneHostResponseDto
} from './dto/find-one.dto';
import {
	UpdateHostBodyDto,
	UpdateHostParamsDto,
	UpdateHostResponseDto
} from './dto/update.dto';
import { Host } from './host.entity';

@Injectable()
export class HostService {
	constructor(
		@InjectRepository(Host)
		private readonly hostsRepository: Repository<Host>
	) {}

	async findAll(): Promise<FindAllHostResponseDto> {
		const hosts = await this.hostsRepository.find({
			relations: ['venues', 'venues.rooms', 'venues.images']
		});
		return hosts.map((host) => host.cast(PublicHost));
	}

	async findOne(
		findOneHostParamsDto: FindOneHostParamsDto
	): Promise<FindOneHostResponseDto> {
		const host = await this.hostsRepository.findOneOrFail({
			where: { host_uid: findOneHostParamsDto.host_uid },
			relations: ['venues', 'venues.rooms', 'venues.images']
		});
		return host.cast(PublicHost);
	}

	async create(
		createHostBodyDto: CreateHostBodyDto
	): Promise<CreateHostResponseDto> {
		const host = this.hostsRepository.create(createHostBodyDto);
		await this.hostsRepository.save(host);
		return host.cast(PublicHost);
	}

	async delete(
		deleteHostParamsDto: DeleteHostParamsDto
	): Promise<DeleteHostResponseDto> {
		const host = await this.hostsRepository.findOneOrFail({
			where: { host_uid: deleteHostParamsDto.host_uid }
		});

		await this.hostsRepository.delete(host.host_id);
		return host.cast(PublicHost);
	}

	async update(
		updateHostParamsDto: UpdateHostParamsDto,
		updateHostBodyDto: UpdateHostBodyDto
	): Promise<UpdateHostResponseDto> {
		const host = await this.hostsRepository.findOneOrFail({
			where: { host_uid: updateHostParamsDto.host_uid }
		});

		host.update(updateHostBodyDto);

		await this.hostsRepository.save(host);
		return host.cast(PublicHost);
	}
}
