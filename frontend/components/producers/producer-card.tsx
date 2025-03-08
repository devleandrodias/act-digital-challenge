"use client";

import { useState } from "react";

import {
  MoreHorizontal,
  PenSquare,
  Trash2,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  MapPin,
  Sprout,
  Tractor,
  BarChart3,
  PieChart,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Producer, Farm as FarmType } from "@/lib/types";
import { formatDocument } from "@/utils/utils";

import { FarmAreaChart } from "../farm/farm-area-chart";
import { FarmCropsChart } from "../farm/farm-crops-chart";
import { useProducerContext } from "@/contexts/ProducerContext";

interface ProducerCardProps {
  producer: Producer;
}

export function ProducerCard({ producer }: ProducerCardProps) {
  const ctxProducer = useProducerContext();

  const [isOpen, setIsOpen] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const totalArea = producer.farms.reduce(
    (sum, farm) => sum + farm.totalArea,
    0
  );

  const handleAddFarm = () => {
    ctxProducer.setFarmModalOpen(true);
  };

  return (
    <Card className="border-green-100 overflow-hidden">
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
              <DropdownMenuItem onClick={handleAddFarm}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Fazenda
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setConfirmDelete(true)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
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
      </CardContent>
      <CardFooter className="flex flex-col items-stretch p-0">
        <div className="w-full">
          <Button
            variant="ghost"
            className="flex justify-between items-center w-full rounded-none border-t h-10"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-sm font-medium">Detalhes das Fazendas</span>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          {isOpen && (
            <div className="border-t">
              {producer.farms.length > 0 ? (
                producer.farms.map((farm) => (
                  <FarmCard
                    key={farm.id}
                    farm={farm}
                    onAddHarvest={onAddHarvest}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Nenhuma fazenda cadastrada
                </div>
              )}
            </div>
          )}
        </div>
      </CardFooter>

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
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(producer.id);
                setConfirmDelete(false);
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function FarmCard({
  farm,
  onAddHarvest,
}: {
  farm: FarmType;
  onAddHarvest?: (farmId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="border-b last:border-b-0">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-green-800">{farm.name}</h4>
          {onAddHarvest && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={() => onAddHarvest(farm.id)}
            >
              <PlusCircle className="mr-1 h-3 w-3" />
              Safra
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 h-8 mb-2">
            <TabsTrigger value="details" className="text-xs">
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="area" className="text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Áreas
            </TabsTrigger>
            <TabsTrigger value="crops" className="text-xs">
              <PieChart className="h-3 w-3 mr-1" />
              Culturas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Localização</p>
                <p className="text-sm">
                  {farm.city}, {farm.state}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Área Total</p>
                <p className="text-sm">{farm.totalArea} ha</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  Área Agricultável
                </p>
                <p className="text-sm">{farm.agriculturalArea} ha</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Área de Vegetação
                </p>
                <p className="text-sm">{farm.vegetationArea} ha</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 h-7 px-2 w-full justify-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-xs font-medium">Safras e Culturas</span>
              {isOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>

            {isOpen && (
              <div className="mt-2">
                {farm.harvests.length > 0 ? (
                  farm.harvests.map((harvest) => (
                    <div
                      key={harvest.id}
                      className="mb-2 last:mb-0 border-t pt-2 mt-2"
                    >
                      <p className="text-xs font-medium flex items-center gap-1">
                        <Sprout className="h-3 w-3 text-green-600" />
                        Safra {harvest.year}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
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
                          <span className="text-xs text-muted-foreground">
                            Nenhuma cultura cadastrada
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
                    Nenhuma safra cadastrada
                  </p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="area" className="mt-0">
            <div className="border rounded-md p-2 bg-white">
              <h5 className="text-xs font-medium text-center mb-2">
                Distribuição de Áreas
              </h5>
              <FarmAreaChart farm={farm} />
            </div>
          </TabsContent>

          <TabsContent value="crops" className="mt-0">
            <div className="border rounded-md p-2 bg-white">
              <h5 className="text-xs font-medium text-center mb-2">
                Culturas Plantadas
              </h5>
              <FarmCropsChart farm={farm} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
