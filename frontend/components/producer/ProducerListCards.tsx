"use client";

import { useQuery } from "@tanstack/react-query";

import { getProducers } from "@/services/producer.service";
import { ProducerCard } from "@/components/producer/ProducerCard";

import { Pending } from "../penfing";
import { ErrorMessage } from "../error";

export function ProducerListCards() {
  const { data, isPending, isError } = useQuery({
    retry: 2,
    queryKey: ["producerData", "dashboardData"],
    queryFn: () => {
      return getProducers();
    },
  });

  if (isPending) {
    return <Pending />;
  }

  if (isError) {
    return <ErrorMessage message="Erro ao carregar produtores" />;
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {data.data.data.map((producer) => (
          <ProducerCard key={producer.id} producer={producer} />
        ))}
      </div>

      {data.data.data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum produtor cadastrado. Clique em <strong>Novo Produtor</strong>{" "}
          para começar.
        </div>
      )}
    </div>
  );
}
