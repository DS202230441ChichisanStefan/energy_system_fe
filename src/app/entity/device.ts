import { Measurement } from './measurement';
import { User } from './user';

export interface IDevice {
  id?: number;
  description?: string;
  address?: string;
  hourlyMaxEnergyConsumption?: number;
  user?: User;
  measurement?: Measurement[];
}
export class Device {

  constructor(
    public id?: number,
    public description?: string,
    public address?: string,
    public hourlyMaxEnergyConsumption?: number,
    public user?: User,
    public measurement?: Measurement[]
  ) {}
}
