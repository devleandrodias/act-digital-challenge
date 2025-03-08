import type { Producer } from "./types";

export const initialData: Producer = {
  id: "893966f6-6e59-4dc9-93c9-43b63c8883cc",
  document: "12345678921",
  name: "João da Silva",
  farms: [
    {
      id: "0d93f62e-74aa-4891-a557-158717a68ad5",
      name: "Fazenda Rio Verde",
      city: "São Paulo",
      state: "SP",
      totalArea: 500,
      agriculturalArea: 300,
      vegetationArea: 200,
      harvests: [
        {
          id: "a0dd5f7b-2fd1-40e0-9594-5984da3d659c",
          year: 2023,
          crops: [
            {
              id: 1,
              name: "Soja",
            },
            {
              id: 2,
              name: "Milho",
            },
          ],
        },
      ],
    },
  ],
};
