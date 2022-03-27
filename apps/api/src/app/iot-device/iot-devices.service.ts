import {
  IotDeviceResponseInterface,
  IotDeviceUpdateInterface,
} from '@domotica/shared/interfaces';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IotDevice, IotDeviceDocument } from './iot-device.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { Logger } from '../logger';
import { fromEvent } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SEE_TYPE } from '../events/enums/see-type.enum';
import { IotDeviceEventDto } from './dto/iot-device-event.dto';

@Injectable()
export class IotDevicesService {
  constructor(
    @InjectModel(IotDevice.name)
    private iotDeviceModel: Model<IotDeviceDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
    private readonly logger: Logger
  ) {}

  async emitEvent(device: IotDeviceEventDto) {
    this.eventEmitter.emit(
      SEE_TYPE.UPDATE_DEVICE_STATE,
      JSON.stringify(device)
    );
  }

  async findOne(macAddres: string): Promise<IotDeviceResponseInterface | null> {
    try {
      let device: IotDeviceResponseInterface = await this.cacheManager.get(
        macAddres
      );

      if (!device) {
        device = await this.iotDeviceModel.findOne({ macAddres });

        if (!device) return null;

        await this.cacheManager.set(device.macAddress, device);
      }

      return device;
    } catch (error) {
      this.logger.error({
        message: error,
        context: IotDevicesService.name,
        save: true,
      });

      return null;
    }
  }

  async getFavorites(id: string): Promise<IotDeviceResponseInterface[] | null> {
    try {
      throw new Error(`Method not implemented. ${id}`);
    } catch (error) {
      this.logger.error({
        message: error,
        context: IotDevicesService.name,
        save: true,
      });

      return null;
    }
  }

  updateStateEvent() {
    return fromEvent(this.eventEmitter, SEE_TYPE.UPDATE_DEVICE_STATE);
  }
}
