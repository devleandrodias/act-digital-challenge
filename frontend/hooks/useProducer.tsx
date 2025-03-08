import { createProducer } from "@/services/producer.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProducer() {
  const queryClient = useQueryClient();

  const createProducerMutation = useMutation({
    mutationFn: (producer: any) => createProducer(producer),
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
    createProducerMutation,
  };
}
