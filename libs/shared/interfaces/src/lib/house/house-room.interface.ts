export interface HouseRoomInterface {
  id: string;
  name: string;
  iotDevices: string[];
  noPlan: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}