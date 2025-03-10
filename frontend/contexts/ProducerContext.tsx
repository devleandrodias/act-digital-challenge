"use client";

import { Farm } from "@/types/farm.types";
import { Harvest } from "@/types/harvest.types";
import { Producer } from "@/types/producer.types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type ProducerContextType = {
  farmListModalOpen: boolean;
  farmFormModalOpen: boolean;
  farmDetailModalOpen: boolean;
  harvestModalOpen: boolean;
  producerModalOpen: boolean;

  setFarmListModalOpen: (open: boolean) => void;
  setFarmFormModalOpen: (open: boolean) => void;
  setFarmDetailModalOpen: (open: boolean) => void;
  setHarvestModalOpen: (open: boolean) => void;
  setProducerModalOpen: (open: boolean) => void;

  farmSelected: Farm | null;
  harvestSelected: Harvest | null;
  producerSelected: Producer | null;
  setFarmSelected: (farm: Farm | null) => void;
  setHarvestSelected: (harvest: Harvest | null) => void;
  setProducerSelected: (producer: Producer | null) => void;
};

const ProducerContext = createContext<ProducerContextType | undefined>(
  undefined
);

// prettier-ignore
export const ProducerProvider = ({ children }: PropsWithChildren) => {
  const [farmListModalOpen, setFarmListModalOpen] = useState(false);
  const [farmFormModalOpen, setFarmFormModalOpen] = useState(false);
  const [farmDetailModalOpen, setFarmDetailModalOpen] = useState(false);

  const [harvestModalOpen, setHarvestModalOpen] = useState(false);
  const [producerModalOpen, setProducerModalOpen] = useState(false);

  const [farmSelected, setFarmSelected] = useState<Farm | null>(null);
  const [harvestSelected, setHarvestSelected] = useState<Harvest | null>(null);
  const [producerSelected, setProducerSelected] = useState<Producer | null>(null);

  return (
    <ProducerContext.Provider
      value={{
        farmSelected,
        harvestSelected,
        producerSelected,
        setFarmSelected,
        setHarvestSelected,
        setProducerSelected,
        farmListModalOpen,
        farmFormModalOpen,
        farmDetailModalOpen,
        harvestModalOpen,
        producerModalOpen,
        setFarmListModalOpen,
        setFarmFormModalOpen,
        setFarmDetailModalOpen,
        setHarvestModalOpen,
        setProducerModalOpen,
      }}
    >
      {children}
    </ProducerContext.Provider>
  );
};

export const useProducerContext = () => {
  const context = useContext(ProducerContext);
  if (context === undefined) {
    throw new Error(
      "useProducerContext must be used within a ProducerProvider"
    );
  }
  return context;
};
