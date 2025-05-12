import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from 'src/venue/venue.entity';
import { Repository } from 'typeorm';
import {
	CreateRoomBodyDto,
	CreateRoomParamsDto,
	CreateRoomResponseDto
} from './dto/create.dto';
import { DeleteRoomParamsDto, DeleteRoomResponseDto } from './dto/delete.dto';
import { PublicRoom } from './dto/entity.dto';
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
import { Room } from './room.entity';

@Injectable()
export class RoomService {
	constructor(
		@InjectRepository(Room)
		private readonly roomsRepository: Repository<Room>,
		@InjectRepository(Venue)
		private readonly venuesRepository: Repository<Venue>
	) {}

	async findAll(): Promise<FindAllRoomResponseDto> {
		const rooms = await this.roomsRepository.find();
		return rooms.map((room) => room.cast(PublicRoom));
	}

	async findOne(
		findOneRoomParamsDto: FindOneRoomParamsDto
	): Promise<FindOneRoomResponseDto> {
		const room = await this.roomsRepository.findOneOrFail({
			where: { room_uid: findOneRoomParamsDto.room_uid }
		});
		return room.cast(PublicRoom);
	}

	async create(
		createRoomParamsDto: CreateRoomParamsDto,
		createRoomBodyDto: CreateRoomBodyDto
	): Promise<CreateRoomResponseDto> {
		const venue = await this.venuesRepository.findOneOrFail({
			where: {
				venue_uid: createRoomParamsDto.venue_uid,
				host: {
					host_uid: createRoomParamsDto.host_uid
				}
			}
		});

		const room = this.roomsRepository.create({
			venue,
			...createRoomBodyDto
		});
		await this.roomsRepository.save(room);
		return room.cast(PublicRoom);
	}

	async delete(
		deleteRoomParamsDto: DeleteRoomParamsDto
	): Promise<DeleteRoomResponseDto> {
		const room = await this.roomsRepository.findOneOrFail({
			where: { room_uid: deleteRoomParamsDto.room_uid }
		});

		await this.roomsRepository.delete(room.room_id);
		return room.cast(PublicRoom);
	}

	async update(
		updateRoomParamsDto: UpdateRoomParamsDto,
		updateRoomBodyDto: UpdateRoomBodyDto
	): Promise<UpdateRoomResponseDto> {
		const room = await this.roomsRepository.findOneOrFail({
			where: { room_uid: updateRoomParamsDto.room_uid }
		});

		room.update(updateRoomBodyDto);
		await this.roomsRepository.save(room);
		return room.cast(PublicRoom);
	}
}
