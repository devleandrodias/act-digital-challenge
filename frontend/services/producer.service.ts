import { brainAgApi } from "@/shared/api/brainAgApi";

export function getProducers() {
  return brainAgApi.get("/producers");
}

export function createProducer(producer: any) {
  return brainAgApi.post("/producers", producer);
}

export function updateProducer(producer: any) {
  return brainAgApi.put(`/producers/${producer.id}`, producer);
}

export function deleteProducer(producerId: string) {
  return brainAgApi.delete(`/producers/${producerId}`);
}
