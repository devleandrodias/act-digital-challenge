"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  PenSquare,
  Trash2,
  PlusCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import type { Producer, Farm } from "@/lib/types";
import { formatDocument } from "@/lib/utils";

interface ProducerListProps {
  producers: Producer[];
  onEdit: (producer: Producer) => void;
  onDelete: (id: string) => void;
  onAddFarm: (producerId: string) => void;
}

export function ProducerList({
  producers,
  onEdit,
  onDelete,
  onAddFarm,
}: ProducerListProps) {
  const [expandedProducer, setExpandedProducer] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedProducer(expandedProducer === id ? null : id);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-green-50">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Fazendas</TableHead>
            <TableHead>Área Total (ha)</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {producers.map((producer) => (
            <>
              <TableRow key={producer.id} className="hover:bg-green-50/50">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleExpand(producer.id)}
                    className="h-8 w-8"
                  >
                    {expandedProducer === producer.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>{formatDocument(producer.document)}</TableCell>
                <TableCell>{producer.name}</TableCell>
                <TableCell>{producer.farms.length}</TableCell>
                <TableCell>
                  {producer.farms.reduce(
                    (sum, farm) => sum + farm.totalArea,
                    0
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(producer)}>
                        <PenSquare className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAddFarm(producer.id)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Fazenda
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setConfirmDelete(producer.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>

              {expandedProducer === producer.id &&
                producer.farms.map((farm) => (
                  <TableRow key={farm.id} className="bg-green-50/30">
                    <TableCell></TableCell>
                    <TableCell colSpan={5}>
                      <FarmDetails farm={farm} />
                    </TableCell>
                  </TableRow>
                ))}
            </>
          ))}

          {producers.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-muted-foreground"
              >
                Nenhum produtor cadastrado. Clique em "Novo Produtor" para
                começar.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog
        open={!!confirmDelete}
        onOpenChange={() => setConfirmDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produtor? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDelete) {
                  onDelete(confirmDelete);
                  setConfirmDelete(null);
                }
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FarmDetails({ farm }: { farm: Farm }) {
  return (
    <div className="p-4 rounded-md bg-white border border-green-100">
      <h4 className="font-medium text-green-800 mb-2">{farm.name}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Localização</p>
          <p>
            {farm.city}, {farm.state}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Área Total</p>
          <p>{farm.totalArea} ha</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Uso do Solo</p>
          <p>
            Agricultável: {farm.agriculturalArea} ha | Vegetação:{" "}
            {farm.vegetationArea} ha
          </p>
        </div>
      </div>

      <div>
        <h5 className="font-medium text-sm text-muted-foreground mb-2">
          Safras e Culturas
        </h5>
        {farm.harvests.map((harvest) => (
          <div key={harvest.id} className="mb-2 last:mb-0">
            <p className="text-sm font-medium">Safra {harvest.year}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {harvest.crops.map((crop) => (
                <span
                  key={crop.id}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {crop.name}
                </span>
              ))}
              {harvest.crops.length === 0 && (
                <span className="text-sm text-muted-foreground">
                  Nenhuma cultura cadastrada
                </span>
              )}
            </div>
          </div>
        ))}
        {farm.harvests.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhuma safra cadastrada
          </p>
        )}
      </div>
    </div>
  );
}
