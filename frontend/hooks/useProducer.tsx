import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createProducer,
  deleteProducer,
  updateProducer,
} from "@/services/producer.service";

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

  const updateProducerMutation = useMutation({
    mutationFn: (producer: any) => updateProducer(producer),
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

  const deleteProducerMutation = useMutation({
    mutationFn: (producerId: string) => deleteProducer(producerId),
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
    updateProducerMutation,
    deleteProducerMutation,
  };
}
