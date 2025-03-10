import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateFarmInput, UpdateFarmInput } from "@/types/farm.types";
import { createFarm, deleteFarm, updateFarm } from "@/services/farm.service";

export function useFarm() {
  const queryClient = useQueryClient();

  const createFarmMutation = useMutation({
    mutationFn: (farm: CreateFarmInput) => createFarm(farm),
    onSuccess: () => {
      toast.success("Fazenda criada com sucesso", {
        description: "Operação realizada com sucesso",
      });

      queryClient.invalidateQueries({
        queryKey: ["producerData", "dashboardData"],
      });
    },
    onError: () => {
      toast.error("Erro ao criar fazenda", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  const updateFarmMutation = useMutation({
    mutationFn: (farm: UpdateFarmInput) => updateFarm(farm),
    onSuccess: () => {
      toast.success("Fazenda atualizada com sucesso", {
        description: "Operação realizada com sucesso",
      });
      queryClient.invalidateQueries({
        queryKey: ["producerData", "dashboardData"],
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar fazenda", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  const deleteFarmMutation = useMutation({
    mutationFn: (farmId: string) => deleteFarm(farmId),
    onSuccess: () => {
      toast.success("Fazenda deletada com sucesso", {
        description: "Operação realizada com sucesso",
      });
      queryClient.invalidateQueries({
        queryKey: ["producerData", "dashboardData"],
      });
    },
    onError: () => {
      toast.error("Erro ao deletar fazenda", {
        description: "Tente novamente mais tarde",
      });
    },
  });

  return {
    createFarmMutation,
    updateFarmMutation,
    deleteFarmMutation,
  };
}
