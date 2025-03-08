"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

export type ProducerContextType = {
  farmModalOpen: boolean;
  cropsModalOpen: boolean;
  harvestModalOpen: boolean;
  producerModalOpen: boolean;
  setFarmModalOpen: (open: boolean) => void;
  setCropsModalOpen: (open: boolean) => void;
  setHarvestModalOpen: (open: boolean) => void;
  setProducerModalOpen: (open: boolean) => void;
};

const ProducerContext = createContext<ProducerContextType | undefined>(
  undefined
);

export const ProducerProvider = ({ children }: PropsWithChildren) => {
  const [farmModalOpen, setFarmModalOpen] = useState(false);
  const [cropsModalOpen, setCropsModalOpen] = useState(false);
  const [harvestModalOpen, setHarvestModalOpen] = useState(false);
  const [producerModalOpen, setProducerModalOpen] = useState(false);

  return (
    <ProducerContext.Provider
      value={{
        farmModalOpen,
        cropsModalOpen,
        harvestModalOpen,
        producerModalOpen,
        setFarmModalOpen,
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
