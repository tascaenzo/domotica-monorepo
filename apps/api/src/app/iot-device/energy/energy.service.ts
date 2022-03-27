import { EneryMonitorStateInterface } from '@domotica/shared/interfaces';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENT_TYPE } from '../../events/enums/device-event-type.enum';
import { EventPayloadInterface } from '../../events/interfaces/event-payload.interface';
import { IotDeviceEventDto } from '../dto/iot-device-event.dto';
import { IotDevicesService } from '../iot-devices.service';

@Injectable()
export class EnergySevice {
  constructor(private readonly iotDeviceService: IotDevicesService) {}

  @OnEvent(EVENT_TYPE.ENERGY_MONITOR)
  handleEneryMonitor(
    payload: EventPayloadInterface<EneryMonitorStateInterface>
  ) {
    this.iotDeviceService.emitEvent(
      new IotDeviceEventDto({
        deviceId: payload.device.id,
        device: payload.device,
        state: payload.message.pyload,
      })
    );
  }
}
