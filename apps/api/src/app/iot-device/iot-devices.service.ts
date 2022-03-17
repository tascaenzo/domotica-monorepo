import { IotDeviceInterface } from '@domotica/shared/interfaces';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IotDevice, IotDeviceDocument } from './iot-device.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { Logger } from '../logger';
import { fromEvent } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SEE_TYPE } from '../events/enums/see-type.enum';

@Injectable()
export class IotDevicesService {
  constructor(
    @InjectModel(IotDevice.name) private iotDeviceModel: Model<IotDeviceDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
    private readonly logger: Logger,
  ) {}

  async update(id: string, device: unknown) {
    this.eventEmitter.emit(SEE_TYPE.UPDATE_DEVICE_STATE, JSON.stringify(device as string));
  }

  async findOne(macAddres: string): Promise<IotDeviceInterface | null> {
    try {
      let device: IotDeviceInterface = await this.cacheManager.get(macAddres);

      if (!device) {
        device = await this.iotDeviceModel.findOne({ macAddres });

        if (!device) return null;

        await this.cacheManager.set(device.macAddress, device);
      }

      return device;
    } catch (error) {
      this.logger.error({ message: error, context: IotDevicesService.name, save: true });

      return null;
    }
  }

  async getFavorites(id: string): Promise<IotDeviceInterface[] | null> {
    try {
      throw new Error(`Method not implemented. ${id}`);
    } catch (error) {
      this.logger.error({ message: error, context: IotDevicesService.name, save: true });

      return null;
    }
  }

  updateStateEvent() {
    return fromEvent(this.eventEmitter, SEE_TYPE.UPDATE_DEVICE_STATE);
  }
}
