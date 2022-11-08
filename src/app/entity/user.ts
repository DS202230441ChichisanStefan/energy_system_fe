import { Device } from './device';
import { Erole } from './erole';

export interface IUser {
  id?: number,
  name?: string;
  username?: string,
  password?: string,
  role?: Erole,
  devices?: Device[]
}

export class User implements IUser {
  
  constructor(
    public id?: number,
    public name?: string,
    public username?: string,
    public password?: string,
    public role?: Erole,
    public devices?: Device[]
  ) {}
}
