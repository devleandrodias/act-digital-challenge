import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProducer,
  deleteProducer,
  updateProducer,
} from "@/services/producer.service";

import {
  CreateProducerInput,
  UpdateProducerInput,
} from "@/types/producer.types";

export function useProducer() {
  const queryClient = useQueryClient();

  const createProducerMutation = useMutation({
    mutationFn: (producer: CreateProducerInput) => createProducer(producer),
    onSuccess: () => {
      toast.success("Novo produtor criado com sucesso", {
        description: "Operação realizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: ["producerData"],
      });
    },
    onError: () => {
      toast.error("Erro ao criar novo produtor", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  const updateProducerMutation = useMutation({
    mutationFn: (producer: UpdateProducerInput) => updateProducer(producer),
    onSuccess: () => {
      toast.success("Produtor atualizado com sucesso", {
        description: "Operação realizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: ["producerData"],
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar produtor", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  const deleteProducerMutation = useMutation({
    mutationFn: (producerId: string) => deleteProducer(producerId),
    onSuccess: () => {
      toast.success("Produtor excluído com sucesso", {
        description: "Operação realizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: ["producerData"],
      });
    },
    onError: () => {
      toast.error("Erro ao excluir produtor", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  return {
    createProducerMutation,
    updateProducerMutation,
    deleteProducerMutation,
  };
}
