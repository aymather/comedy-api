import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import { CreateHostBodyDto, CreateHostResponseDto } from './dto/create.dto';
import { DeleteHostParamsDto, DeleteHostResponseDto } from './dto/delete.dto';
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
import { HostService } from './host.service';

@Controller('host')
export class HostController {
	constructor(private readonly hostService: HostService) {}

	@Post()
	async create(
		@Body() createHostBodyDto: CreateHostBodyDto
	): Promise<CreateHostResponseDto> {
		return this.hostService.create(createHostBodyDto);
	}

	@Delete(':host_uid')
	async delete(
		@Param() deleteHostParamsDto: DeleteHostParamsDto
	): Promise<DeleteHostResponseDto> {
		return this.hostService.delete(deleteHostParamsDto);
	}

	@Get()
	async findAll(): Promise<FindAllHostResponseDto> {
		return this.hostService.findAll();
	}

	@Get(':host_uid')
	async findOne(
		@Param() findOneHostParamsDto: FindOneHostParamsDto
	): Promise<FindOneHostResponseDto> {
		return this.hostService.findOne(findOneHostParamsDto);
	}

	@Put(':host_uid')
	async update(
		@Param() updateHostParamsDto: UpdateHostParamsDto,
		@Body() updateHostBodyDto: UpdateHostBodyDto
	): Promise<UpdateHostResponseDto> {
		return this.hostService.update(updateHostParamsDto, updateHostBodyDto);
	}
}
