import { Province } from './Province';

export interface Community {
  flag: string;
  community: string;
  surface: number;
  population: number;
  provinces: Province[];
  capital: string;
}
