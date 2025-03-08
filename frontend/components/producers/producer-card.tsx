"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PenSquare,
  Trash2,
  PlusCircle,
  MapPin,
  Sprout,
  TractorIcon as Farm,
  BarChart3,
  PieChart,
  CalendarDays,
} from "lucide-react";
import type { Producer, Farm as FarmType } from "@/lib/types";
import { formatDocument } from "@/utils/utils";
import { FarmCropsChart } from "../farm/farm-crops-chart";
import { FarmAreaChart } from "../farm/farm-area-chart";
import { useProducerContext } from "@/contexts/ProducerContext";
import { useProducer } from "@/hooks/useProducer";

interface ProducerCardProps {
  producer: Producer;
}

export function ProducerCard({ producer }: ProducerCardProps) {
  const ctxProducer = useProducerContext();

  const { deleteProducerMutation } = useProducer();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [selectedFarm, setSelectedFarm] = useState<FarmType | null>(null);

  const totalArea = producer.farms.reduce(
    (sum, farm) => sum + farm.totalArea,
    0
  );

  const handleDeleteProducer = async () => {
    await deleteProducerMutation.mutateAsync(producer.id);
    setConfirmDelete(false);
  };

  return (
    <>
      <Card
        className="border-green-100 overflow-hidden cursor-pointer hover:border-green-300 transition-colors relative"
        onClick={() => {
          ctxProducer.setFarmModalOpen(true);
        }}
      >
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
              <Farm className="h-4 w-4 text-green-600" />
              <span className="text-sm">{producer.farms.length} fazendas</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm">{totalArea} ha</span>
            </div>
          </div>
        </CardContent>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-green-50"
            data-action-button="true"
            title="Editar produtor"
            onClick={() => {
              ctxProducer.setProducerModalOpen(true);
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

      {/* Dialog de fazendas */}
      {/* <Dialog
        open={isProducerDialogOpen}
        onOpenChange={setIsProducerDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-green-800">
              {producer.name}
            </DialogTitle>
            <DialogDescription>
              {formatDocument(producer.document)}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <h4 className="text-sm font-medium mb-3">Propriedades</h4>
            {producer.farms.length > 0 ? (
              <div className="grid gap-2">
                {producer.farms.map((farm) => (
                  <Button
                    key={farm.id}
                    variant="outline"
                    className="w-full justify-between h-auto py-3 px-4"
                    onClick={() => setSelectedFarm(farm)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{farm.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {farm.city}, {farm.state}
                      </span>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-xs text-muted-foreground">
                        Área Total
                      </span>
                      <span className="text-sm font-medium">
                        {farm.totalArea} ha
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground py-4 border rounded-md">
                Nenhuma fazenda cadastrada
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
            <Button
              variant="outline"
              onClick={() => setIsProducerDialogOpen(false)}
            >
              Fechar
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsProducerDialogOpen(false);
                }}
              >
                <PenSquare className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setIsProducerDialogOpen(false);
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Fazenda
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {selectedFarm && (
        <FarmDetailDialog
          farm={selectedFarm}
          onClose={() => setSelectedFarm(null)}
        />
      )}
    </>
  );
}

function FarmDetailDialog({
  farm,
  onClose,
  onAddHarvest,
}: {
  farm: FarmType;
  onClose: () => void;
  onAddHarvest?: (farmId: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-xl text-green-800">
              {farm.name}
            </DialogTitle>
            <DialogDescription>
              {farm.city}, {farm.state}
            </DialogDescription>
          </div>
          {onAddHarvest && (
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => {
                onAddHarvest(farm.id);
                onClose();
              }}
            >
              <PlusCircle className="mr-1 h-4 w-4" />
              Nova Safra
            </Button>
          )}
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 h-10 mb-4">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="area">
              <BarChart3 className="h-4 w-4 mr-1" />
              Áreas
            </TabsTrigger>
            <TabsTrigger value="crops">
              <PieChart className="h-4 w-4 mr-1" />
              Culturas
            </TabsTrigger>
            <TabsTrigger value="harvests">
              <CalendarDays className="h-4 w-4 mr-1" />
              Safras
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Área Total</p>
                <p className="text-lg font-semibold">{farm.totalArea} ha</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Localização</p>
                <p className="text-lg font-semibold">
                  {farm.city}, {farm.state}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">
                  Área Agricultável
                </p>
                <p className="text-lg font-semibold">
                  {farm.agriculturalArea} ha
                </p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">
                  Área de Vegetação
                </p>
                <p className="text-lg font-semibold">
                  {farm.vegetationArea} ha
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="area" className="mt-0">
            <div className="border rounded-md p-4 bg-white">
              <h5 className="text-sm font-medium text-center mb-4">
                Distribuição de Áreas
              </h5>
              <FarmAreaChart farm={farm} />
            </div>
          </TabsContent>

          <TabsContent value="crops" className="mt-0">
            <div className="border rounded-md p-4 bg-white">
              <h5 className="text-sm font-medium text-center mb-4">
                Culturas Plantadas
              </h5>
              <FarmCropsChart farm={farm} />
            </div>
          </TabsContent>

          <TabsContent value="harvests" className="mt-0">
            <div className="border rounded-md p-4">
              <h5 className="text-sm font-medium mb-4">Safras e Culturas</h5>

              {farm.harvests.length > 0 ? (
                <div className="space-y-4">
                  {farm.harvests.map((harvest) => (
                    <div key={harvest.id} className="border rounded-md p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Sprout className="h-4 w-4 text-green-600" />
                        <h6 className="font-medium">Safra {harvest.year}</h6>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {harvest.crops.map((crop) => (
                          <Badge
                            key={crop.id}
                            variant="outline"
                            className="text-xs bg-green-50 text-green-800 hover:bg-green-100"
                          >
                            {crop.name}
                          </Badge>
                        ))}
                        {harvest.crops.length === 0 && (
                          <span className="text-sm text-muted-foreground">
                            Nenhuma cultura cadastrada
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md text-muted-foreground">
                  <p>Nenhuma safra cadastrada</p>
                  {onAddHarvest && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        onAddHarvest(farm.id);
                        onClose();
                      }}
                    >
                      <PlusCircle className="mr-1 h-4 w-4" />
                      Adicionar Safra
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
