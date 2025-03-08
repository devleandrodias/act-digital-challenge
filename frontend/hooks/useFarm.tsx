import { createFarm } from "@/services/farm.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFarm() {
  const queryClient = useQueryClient();

  const createFarmMutation = useMutation({
    mutationFn: (farm: any) => createFarm(farm),
    onSuccess: () => {
      //   toast({
      //     title: "Mensagem excluída com sucesso",
      //     description: "Seu mensagem foi excluída com sucesso",
      //   });

      queryClient.invalidateQueries({
        queryKey: ["producerData"],
      });
    },
    onError: () => {
      //   toast({
      //     title: "Erro ao excluir mensagem",
      //     description: "Tente novamente mais tarde",
      //     variant: "destructive",
      //   });
    },
  });

  return {
    createFarmMutation,
  };
}
