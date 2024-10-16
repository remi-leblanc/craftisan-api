import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreToUser } from './entities/store-to-user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Store, StoreToUser])],
	controllers: [StoresController],
	providers: [StoresService],
})
export class StoresModule { }
