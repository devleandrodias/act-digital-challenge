import { brainAgApi } from "@/shared/api/brainAgApi";

export function getProducers() {
  return brainAgApi.get("/producers");
}

export function createProducer(producer: any) {
  return brainAgApi.post("/producers", producer);
}
