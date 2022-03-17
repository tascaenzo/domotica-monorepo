import { EneryMonitorStateInterface } from '@domotica/shared/interfaces';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENT_TYPE } from '../../events/enums/device-event-type.enum';
import { EventPayloadInterface } from '../../events/interfaces/event-payload.interface';
import { IotDevicesService } from '../iot-devices.service';

@Injectable()
export class EnergySevice {
  constructor(private readonly iotDeviceService: IotDevicesService) {}

  @OnEvent(EVENT_TYPE.ENERGY_MONITOR)
  handleEneryMonitor(payload: EventPayloadInterface<EneryMonitorStateInterface>) {
    this.iotDeviceService.update(payload.device.id, payload);
  }
}
