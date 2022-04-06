import { CONTROLLER_BASE_PATH } from '@domotica/shared/enums';
import {
  IotDeviceResponseInterface,
  JwtPyloadInterface,
} from '@domotica/shared/interfaces';
import { Controller, Get, Sse, UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IotDevicesService } from './iot-devices.service';

@Controller(CONTROLLER_BASE_PATH.IOT_DEVICES)
export class IotDeviceController {
  constructor(private readonly iotDeviceService: IotDevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(
    @AuthUser() auth: JwtPyloadInterface
  ): Promise<IotDeviceResponseInterface[]> {
    const devices = await this.iotDeviceService.getFavorites(auth.user.id);

    if (!devices) return [];

    return devices;
  }

  @Sse('sse')
  sse() {
    return this.iotDeviceService.updateStateEvent();
  }
}
