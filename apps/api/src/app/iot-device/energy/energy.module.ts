import { Module } from '@nestjs/common';
import { EnergyController } from './energy.controller';
import { EnergySevice } from './energy.service';

@Module({
  controllers: [EnergyController],
  providers: [EnergySevice],
  exports: [EnergySevice],
})
export class EnergyModule {}
