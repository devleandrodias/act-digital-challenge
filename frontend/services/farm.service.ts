import { brainAgApi } from "@/shared/api/brainAgApi";

import {
  UpdateFarmInput,
  CreateFarmInput,
  CreateFarmOutput,
} from "@/types/farm.types";

export function getFarms(producerId: string) {
  return brainAgApi.get(`/farms/${producerId}`);
}

export function createFarm(farm: CreateFarmInput) {
  return brainAgApi.post<CreateFarmOutput>(`/farms/${farm.producerId}`, farm);
}

export function updateFarm(farm: UpdateFarmInput) {
  return brainAgApi.put<void>(`/farms/${farm.id}`, farm);
}

export function deleteFarm(farmId: string) {
  return brainAgApi.delete<void>(`/farms/${farmId}`);
}
