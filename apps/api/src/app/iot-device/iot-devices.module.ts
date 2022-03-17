import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IotDeviceController } from './iot-device.controller';
import { IotDevice, IotDeviceSchema } from './iot-device.schema';
import { IotDevicesService } from './iot-devices.service';
import { Logger } from '../logger';
import { EnergySevice } from './energy/energy.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: IotDevice.name, schema: IotDeviceSchema }]),
  ],
  controllers: [IotDeviceController],
  providers: [IotDevicesService, Logger, EnergySevice],
  exports: [MongooseModule, IotDevicesService, Logger],
})
export class IotDevicesModule {}
