"use client";

import { useState } from "react";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { Farm } from "@/types/farm.types";
import { useFarm } from "@/hooks/useFarm";
import { Button } from "@/components/ui/button";
import { Producer } from "@/types/producer.types";
import { useProducerContext } from "@/contexts/ProducerContext";

type FarmCardProps = {
  farm: Farm;
  producer: Producer;
};

export function FarmCard({ farm, producer }: FarmCardProps) {
  const ctxProducer = useProducerContext();

  const { deleteFarmMutation } = useFarm();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleViewFarm = (farm: Farm) => {
    ctxProducer.setProducerSelected(producer);
    ctxProducer.setFarmDetailModalOpen(true);
    ctxProducer.setFarmSelected(farm);
  };

  const handleEditFarm = (farm: Farm) => {
    ctxProducer.setProducerSelected(producer);
    ctxProducer.setFarmFormModalOpen(true);
    ctxProducer.setFarmSelected(farm);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    ctxProducer.setFarmSelected(null);
  };

  const handleDeleteProducer = async () => {
    await deleteFarmMutation.mutateAsync(farm.id);
    setConfirmDelete(false);
  };

  return (
    <div
      key={farm.id}
      className="flex items-center justify-between w-full border rounded-md px-4 py-3 hover:bg-gray-50 transition-colors"
    >
      <Button
        variant="ghost"
        className="flex-1 h-auto p-0 justify-start hover:bg-transparent"
        onClick={() => handleViewFarm(farm)}
      >
        <div className="flex flex-col items-start">
          <span className="font-medium text-sm">{farm.name}</span>
          <span className="text-xs text-muted-foreground">
            {farm.city}, {farm.state}
          </span>
        </div>
      </Button>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end text-right">
          <span className="text-xs text-muted-foreground">Área Total</span>
          <span className="text-sm font-medium">{farm.totalArea} ha</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewFarm(farm)}>
              <Eye className="mr-2 h-4 w-4" />
              <span>Visualizar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditFarm(farm)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setConfirmDelete(true);
              }}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Excluir</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja propriedade? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProducer}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
