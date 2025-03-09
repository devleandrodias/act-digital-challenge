import { Crop } from "./crop.types";

export type Harvest = {
  id: string;
  year: number;
  crops: Crop[];
};
