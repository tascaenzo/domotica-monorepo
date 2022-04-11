import { HouseService } from './house.service';
import { CONTROLLER_BASE_PATH } from '@domotica/shared/enums';
import { Controller, Get } from '@nestjs/common';

@Controller(CONTROLLER_BASE_PATH.HOUSE)
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get()
  async getHouse() {
    const house = await this.houseService.getHouse();

    return house;
  }
}
