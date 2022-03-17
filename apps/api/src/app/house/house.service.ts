import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '../logger';
import { CreatePlanDto } from './dto/create-plan.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetHouseDto } from './dto/get-house.dto';
import { HousePlan, HousePlanDocument } from './schemas/house-plan.schema';
import { HouseRoom, HouseRoomDocument } from './schemas/house-room.schema';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(HousePlan.name) protected readonly housePlanModel: Model<HousePlanDocument>,
    @InjectModel(HouseRoom.name) protected readonly houseRoomModel: Model<HouseRoomDocument>,
    protected readonly logger: Logger,
  ) {}

  async getHouse(): Promise<GetHouseDto | null>{
    return new GetHouseDto();
  }

  async createPlan(planDto: CreatePlanDto): Promise<HousePlan | null> {
    try {
      return this.housePlanModel.create(planDto);
    } catch (error) {
      this.logger.error({ message: error, context: HouseService.name, save: true });

      return null;
    }
  }

  async createRoom(roomDto: CreateRoomDto): Promise<HouseRoom | null> {
    try {
      return this.houseRoomModel.create(roomDto);
    } catch (error) {
      this.logger.error({ message: error, context: HouseService.name, save: true });

      return null;
    }
  }

  async removePlan(id: string): Promise<HousePlan | null> {
    try {
      return this.housePlanModel.findOneAndUpdate({ _id: id }, { deletedAt: new Date() });
    } catch (error) {
      this.logger.error({ message: error, context: HouseService.name, save: true });

      return null;
    }
  }

  async removeRoom(id: string): Promise<HouseRoom | null> {
    try {
      return this.houseRoomModel.findOneAndUpdate({ _id: id }, { deletedAt: new Date() });
    } catch (error) {
      this.logger.error({ message: error, context: HouseService.name, save: true });

      return null;
    }
  }
}
