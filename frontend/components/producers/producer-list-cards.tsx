"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducers } from "@/services/producer.service";
import { HarvestModal } from "@/components/harvest/harvest-modal";
import { ProducerCard } from "@/components/producers/producer-card";

interface ProducerListCardsProps {}

export function ProducerListCards({}: ProducerListCardsProps) {
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  const { data, isPending, isError } = useQuery<any>({
    retry: 2,
    queryKey: ["producerData"],
    queryFn: () => {
      return getProducers();
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.data.data.map((producer: any) => (
          <ProducerCard key={producer.id} producer={producer} />
        ))}
      </div>

      {data.data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum produtor cadastrado. Clique em <strong>Novo Produtor</strong>{" "}
          para começar.
        </div>
      )}

      {selectedFarmId && <HarvestModal farmId={selectedFarmId} />}
    </div>
  );
}
