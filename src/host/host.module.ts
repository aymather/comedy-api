import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostController } from './host.controller';
import { Host } from './host.entity';
import { HostService } from './host.service';

@Module({
	imports: [TypeOrmModule.forFeature([Host])],
	controllers: [HostController],
	providers: [HostService]
})
export class HostModule {}
