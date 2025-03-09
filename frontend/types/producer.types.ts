import { Farm } from "./farm.types";

export type Producer = {
  id: string;
  document: string;
  name: string;
  farms: Farm[];
};

export type CreateProducerInput = {
  name: string;
  document: string;
};

export type CreateProducerOutput = {
  id: string;
  name: string;
  document: string;
};

export type UpdateProducerInput = {
  id: string;
  name: string;
  document: string;
};

export type UpdateProducerOutput = {
  id: string;
  name: string;
  document: string;
};
