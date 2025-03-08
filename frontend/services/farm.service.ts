import { brainAgApi } from "@/shared/api/brainAgApi";

export function getFarms(producerId: string) {
  return brainAgApi.get(`/farms/${producerId}`);
}

export function createFarm(farm: any) {
  return brainAgApi.post(`/farms/${farm.producerId}`, farm);
}

export function updateFarm(farm: any) {
  return brainAgApi.put(`/farms/${farm.id}`, farm);
}

export function deleteFarm(farmId: string) {
  return brainAgApi.delete(`/farms/${farmId}`);
}
