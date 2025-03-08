"use client";

import type { Producer } from "@/lib/types";
import { ProducerCard } from "@/components/producer-card";
import { HarvestModal } from "@/components/harvest-modal";
import { useState } from "react";

interface ProducerListCardsProps {
  producers: Producer[];
  onEdit: (producer: Producer) => void;
  onDelete: (id: string) => void;
  onAddFarm: (producerId: string) => void;
  onAddHarvest: (farmId: string, harvest: any) => void;
}

export function ProducerListCards({
  producers,
  onEdit,
  onDelete,
  onAddFarm,
  onAddHarvest,
}: ProducerListCardsProps) {
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {producers.map((producer) => (
          <ProducerCard
            key={producer.id}
            producer={producer}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddFarm={onAddFarm}
            onAddHarvest={(farmId) => setSelectedFarmId(farmId)}
          />
        ))}
      </div>

      {producers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum produtor cadastrado. Clique em "Novo Produtor" para começar.
        </div>
      )}

      {selectedFarmId && (
        <HarvestModal
          farmId={selectedFarmId}
          onClose={() => setSelectedFarmId(null)}
          onSave={onAddHarvest}
        />
      )}
    </div>
  );
}
