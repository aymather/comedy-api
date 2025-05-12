import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import {
	CreateRoomBodyDto,
	CreateRoomParamsDto,
	CreateRoomResponseDto
} from './dto/create.dto';
import { DeleteRoomParamsDto, DeleteRoomResponseDto } from './dto/delete.dto';
import { FindAllRoomResponseDto } from './dto/find-all.dto';
import {
	FindOneRoomParamsDto,
	FindOneRoomResponseDto
} from './dto/find-one.dto';
import {
	UpdateRoomBodyDto,
	UpdateRoomParamsDto,
	UpdateRoomResponseDto
} from './dto/update.dto';
import { RoomService } from './room.service';

@Controller()
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@Get('room')
	async findAll(): Promise<FindAllRoomResponseDto> {
		return this.roomService.findAll();
	}

	@Get('host/:host_uid/venue/:venue_uid/room/:room_uid')
	async findOne(
		@Param() findOneRoomParamsDto: FindOneRoomParamsDto
	): Promise<FindOneRoomResponseDto> {
		return this.roomService.findOne(findOneRoomParamsDto);
	}

	@Post('host/:host_uid/venue/:venue_uid/room')
	async create(
		@Param() createRoomParamsDto: CreateRoomParamsDto,
		@Body() createRoomBodyDto: CreateRoomBodyDto
	): Promise<CreateRoomResponseDto> {
		return this.roomService.create(createRoomParamsDto, createRoomBodyDto);
	}

	@Delete('host/:host_uid/venue/:venue_uid/room/:room_uid')
	async delete(
		@Param() deleteRoomParamsDto: DeleteRoomParamsDto
	): Promise<DeleteRoomResponseDto> {
		return this.roomService.delete(deleteRoomParamsDto);
	}

	@Put('host/:host_uid/venue/:venue_uid/room/:room_uid')
	async update(
		@Param() updateRoomParamsDto: UpdateRoomParamsDto,
		@Body() updateRoomBodyDto: UpdateRoomBodyDto
	): Promise<UpdateRoomResponseDto> {
		return this.roomService.update(updateRoomParamsDto, updateRoomBodyDto);
	}
}
