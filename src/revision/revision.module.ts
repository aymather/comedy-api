import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/event/event.entity';
import { RevisionController } from './revision.controller';
import { RevisionService } from './revision.service';

@Module({
	imports: [TypeOrmModule.forFeature([Event])],
	controllers: [RevisionController],
	providers: [RevisionService]
})
export class RevisionModule {}
