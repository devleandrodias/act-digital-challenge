"use client";

import { useState } from "react";

import { Trash2, MapPin, Tractor, PenSquare, Eye } from "lucide-react";

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
import { Producer } from "@/types/producer.types";
import { useProducerContext } from "@/contexts/ProducerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProducerCardProps {
  producer: Producer;
}

export function ProducerCard({ producer }: ProducerCardProps) {
  const ctxProducer = useProducerContext();

  const { deleteProducerMutation } = useProducer();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const totalArea = 322;

  const handleDeleteProducer = async () => {
    await deleteProducerMutation.mutateAsync(producer.id);
    setConfirmDelete(false);
  };

  return (
    <>
      {/* Card de detalhe da fazenda */}
      <Card className="border-green-100 overflow-hidden cursor-pointer hover:border-green-300 transition-colors relative">
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
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Tractor className="h-4 w-4 text-green-600" />
              <span className="text-sm">{producer.farms.length} fazendas</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm">{totalArea} ha</span>
            </div>
          </div>
        </CardContent>

        {/* Botões de ação */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-green-50"
            data-action-button="true"
            title="Visualizar propriedades"
            onClick={() => {
              ctxProducer.setFarmListModalOpen(true);
              ctxProducer.setProducerSelected(producer);
            }}
          >
            <Eye className="h-4 w-4 text-green-700" />
            <span className="sr-only">Visualizar</span>
          </Button>
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
            }}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      </Card>

      {/* Modal de confirmação de exclusão da fazenda */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produtor? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>
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
