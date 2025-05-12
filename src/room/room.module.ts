import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from 'src/venue/venue.entity';
import { RoomController } from './room.controller';
import { Room } from './room.entity';
import { RoomService } from './room.service';

@Module({
	imports: [TypeOrmModule.forFeature([Room, Venue])],
	controllers: [RoomController],
	providers: [RoomService]
})
export class RoomModule {}
