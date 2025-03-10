import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createHarvest,
  deleteHarvest,
  updateHarvest,
} from "@/services/harvest.service";

import { CreateHarvestInput, UpdateHarvestInput } from "@/types/harvest.types";

export function useHarvest() {
  const queryClient = useQueryClient();

  const createHarvestMutation = useMutation({
    mutationFn: (harvest: CreateHarvestInput) => createHarvest(harvest),
    onSuccess: () => {
      toast.success("Safra criada com sucesso", {
        description: "Operação realizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: ["producerData"],
      });
    },
    onError: () => {
      toast.error("Erro ao criar a safra", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  const updateHarvestMutation = useMutation({
    mutationFn: (harvest: UpdateHarvestInput) => updateHarvest(harvest),
    onSuccess: () => {
      toast.success("Safra atualizada com sucesso", {
        description: "Operação realizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: ["producerData"],
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar a safra", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  const deleteHarvestMutation = useMutation({
    mutationFn: (id: string) => deleteHarvest(id),
    onSuccess: () => {
      toast.success("Safra deletada com sucesso", {
        description: "Operação realizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: ["producerData"],
      });
    },
    onError: () => {
      toast.error("Erro ao deletar a safra", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  return {
    createHarvestMutation,
    updateHarvestMutation,
    deleteHarvestMutation,
  };
}
