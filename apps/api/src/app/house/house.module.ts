import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '../logger';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { HousePlan, HousePlanSchema } from './schemas/house-plan.schema';
import { HouseRoom, HouseRoomSchema } from './schemas/house-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HousePlan.name, schema: HousePlanSchema }]),
    MongooseModule.forFeature([{ name: HouseRoom.name, schema: HouseRoomSchema }])
  ],
  controllers: [HouseController],
  providers: [HouseService, Logger],
  exports: [HouseService],
})
export class HouseModule {}
