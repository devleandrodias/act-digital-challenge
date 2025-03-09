import { PaginationResult } from "@/lib/types";
import { brainAgApi } from "@/shared/api/brainAgApi";

import {
  Producer,
  CreateProducerInput,
  CreateProducerOutput,
  UpdateProducerInput,
  UpdateProducerOutput,
} from "@/types/producer.types";

export function getProducers() {
  return brainAgApi.get<PaginationResult<Producer>>("/producers");
}

export function createProducer(producer: CreateProducerInput) {
  const url = "/producers";
  return brainAgApi.post<CreateProducerOutput>(url, producer);
}

export function updateProducer(producer: UpdateProducerInput) {
  const url = `/producers/${producer.id}`;
  return brainAgApi.put<UpdateProducerOutput>(url, producer);
}

export function deleteProducer(id: string) {
  const url = `/producers/${id}`;
  return brainAgApi.delete(url);
}
