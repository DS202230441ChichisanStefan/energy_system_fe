import { Device } from "./device";

export interface IMeasurement {
  id?: number;
  timestamp?: Date;
  energyConsumption?: number;
  device?: Device;
}

export class Measurement implements IMeasurement {

  constructor(
    public id?: number,
    public timestamp?: Date,
    public energyConsumption?: number,
    public device?: Device
  ) {}
}
