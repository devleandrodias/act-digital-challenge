"use client";

import { Farm } from "@/types/farm.types";
import { Producer } from "@/types/producer.types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type ProducerContextType = {
  farmListModalOpen: boolean;
  farmFormModalOpen: boolean;
  farmDetailModalOpen: boolean;
  cropsModalOpen: boolean;
  harvestModalOpen: boolean;
  producerModalOpen: boolean;
  selectedCrop: string | null;
  selectedHarvest: string | null;
  setSelectedCrop: (crop: string | null) => void;
  setSelectedHarvest: (harvest: string | null) => void;
  setFarmListModalOpen: (open: boolean) => void;
  setFarmFormModalOpen: (open: boolean) => void;
  setFarmDetailModalOpen: (open: boolean) => void;
  setCropsModalOpen: (open: boolean) => void;
  setHarvestModalOpen: (open: boolean) => void;
  setProducerModalOpen: (open: boolean) => void;

  producerSelected: Producer | null;
  farmSelected: Farm | null;
  setProducerSelected: (producer: Producer | null) => void;
  setFarmSelected: (farm: Farm | null) => void;
};

const ProducerContext = createContext<ProducerContextType | undefined>(
  undefined
);

export const ProducerProvider = ({ children }: PropsWithChildren) => {
  const [farmListModalOpen, setFarmListModalOpen] = useState(false);
  const [farmFormModalOpen, setFarmFormModalOpen] = useState(false);
  const [farmDetailModalOpen, setFarmDetailModalOpen] = useState(false);

  const [cropsModalOpen, setCropsModalOpen] = useState(false);
  const [harvestModalOpen, setHarvestModalOpen] = useState(false);
  const [producerModalOpen, setProducerModalOpen] = useState(false);

  const [producerSelected, setProducerSelected] = useState<Producer | null>(
    null
  );

  const [farmSelected, setFarmSelected] = useState<Farm | null>(null);

  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [selectedHarvest, setSelectedHarvest] = useState<string | null>(null);

  return (
    <ProducerContext.Provider
      value={{
        farmSelected,
        producerSelected,
        setFarmSelected,
        setProducerSelected,
        selectedCrop,
        selectedHarvest,
        setSelectedCrop,
        setSelectedHarvest,
        farmListModalOpen,
        farmFormModalOpen,
        farmDetailModalOpen,
        cropsModalOpen,
        harvestModalOpen,
        producerModalOpen,
        setFarmListModalOpen,
        setFarmFormModalOpen,
        setFarmDetailModalOpen,
        setCropsModalOpen,
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
