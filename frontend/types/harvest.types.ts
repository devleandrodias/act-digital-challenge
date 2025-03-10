import { Crop } from "./crop.types";

export type Harvest = {
  id: string;
  year: number;
  crops: Crop[];
};

export type CreateHarvestInput = {
  farmId: string;
  year: number;
  crops: {
    name: string;
  }[];
};

export type CreateHarvestOutput = {
  id: string;
  year: number;
  crops: {
    id: string;
    name: string;
  }[];
};

export type UpdateHarvestInput = {
  harvestId: string;
  year: number;
  crops: {
    name: string;
  }[];
};
