export interface Crop {
  id: number;
  name: string;
}

export interface Harvest {
  id: string;
  year: number;
  crops: Crop[];
}

export interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  harvests: Harvest[];
}

export interface Producer {
  id: string;
  document: string;
  name: string;
  farms: Farm[];
}

export type DashboardOutput = {
  totalFarms: number;
  totalArea: number;
  totalCrops: number;
};
