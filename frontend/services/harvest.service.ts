import { brainAgApi } from "@/shared/api/brainAgApi";

import {
  CreateHarvestInput,
  CreateHarvestOutput,
  UpdateHarvestInput,
} from "@/types/harvest.types";

export function createHarvest(harvest: CreateHarvestInput) {
  const url = `/harvests/${harvest.farmId}`;
  return brainAgApi.post<CreateHarvestOutput>(url, harvest);
}

export function updateHarvest(harvest: UpdateHarvestInput) {
  const url = `/harvests/${harvest.harvestId}`;
  return brainAgApi.put<void>(url, harvest);
}

export function deleteHarvest(harvestId: string) {
  const url = `/harvests/${harvestId}`;
  return brainAgApi.delete<void>(url);
}
