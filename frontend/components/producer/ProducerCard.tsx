"use client";

import { useState } from "react";

import {
  Trash2,
  MapPin,
  Tractor,
  PenSquare,
  ChevronDown,
  ChevronUp,
  PlusCircle,
} from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { formatDocument } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { useProducer } from "@/hooks/useProducer";
import type { Producer } from "@/types/producer.types";
import { useProducerContext } from "@/contexts/ProducerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FarmCard } from "./farm/FarmCard";

interface ProducerCardProps {
  producer: Producer;
}

export function ProducerCard({ producer }: ProducerCardProps) {
  const ctxProducer = useProducerContext();

  const { deleteProducerMutation } = useProducer();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const totalArea = producer.farms.reduce(
    (total, farm) => total + Number(farm.totalArea),
    0
  );

  const handleOpenChange = (open: boolean) => {
    ctxProducer.setProducerModalOpen(open);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    ctxProducer.setProducerSelected(null);
  };

  const handleDeleteProducer = async () => {
    await deleteProducerMutation.mutateAsync(producer.id);
    setConfirmDelete(false);
  };

  const handleAddFarm = () => {
    ctxProducer.setProducerSelected(producer);
    ctxProducer.setFarmFormModalOpen(true);
  };

  return (
    <>
      <Card className="border-green-100 overflow-hidden hover:border-green-300 transition-colors relative w-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-bold text-green-800">
                {producer.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {formatDocument(producer.document)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Tractor className="h-4 w-4 text-green-600" />
              <span className="text-sm">{producer.farms.length} fazendas</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm">{totalArea} ha</span>
            </div>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center w-full justify-between"
              >
                <span>Propriedades</span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              {producer.farms.length > 0 ? (
                <div className="space-y-2 border rounded-md p-2">
                  {producer.farms.map((farm) => (
                    <FarmCard key={farm.id} farm={farm} producer={producer} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-sm text-muted-foreground py-4 border rounded-md">
                  Nenhuma fazenda cadastrada
                </div>
              )}
              <Button
                className="w-full bg-green-600 hover:bg-green-700 mt-2"
                size="sm"
                onClick={handleAddFarm}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Fazenda
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>

        {/* Botões de ação */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-green-50"
            data-action-button="true"
            title="Editar produtor"
            onClick={() => {
              ctxProducer.setProducerModalOpen(true);
              ctxProducer.setProducerSelected(producer);
            }}
          >
            <PenSquare className="h-4 w-4 text-green-700" />
            <span className="sr-only">Editar</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-red-50"
            data-action-button="true"
            title="Excluir produtor"
            onClick={() => {
              setConfirmDelete(true);
              ctxProducer.setProducerSelected(producer);
            }}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      </Card>

      {/* Modal de confirmação de exclusão da fazenda */}
      <Dialog open={confirmDelete} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produtor? Esta ação não pode
              ser desfeita.
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
    </>
  );
}
