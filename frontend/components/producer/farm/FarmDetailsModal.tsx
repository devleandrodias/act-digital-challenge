"use client";

import { useState } from "react";

import {
  Sprout,
  PieChart,
  BarChart3,
  PlusCircle,
  CalendarDays,
  Pencil,
} from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Harvest } from "@/types/harvest.types";
import { useProducerContext } from "@/contexts/ProducerContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Button } from "../../ui/button";
import { DialogHeader, DialogFooter } from "../../ui/dialog";
import { FarmAreaChart } from "./charts/ProducerFarmAreaChart";
import { FarmCropsChart } from "./charts/ProducerFarmCropsChart";

export function FarmDetailsModal() {
  const ctxProducer = useProducerContext();

  const [activeTab, setActiveTab] = useState("details");

  const existsHarvest = !!ctxProducer.farmSelected?.harvests.length;

  const handleEditHarvest = (harvest: Harvest) => {
    ctxProducer.setHarvestModalOpen(true);
    ctxProducer.setHarvestSelected(harvest);
  };

  const handleAddHarvest = () => {
    ctxProducer.setHarvestModalOpen(true);
    ctxProducer.setHarvestSelected(null);
  };

  return (
    <Dialog
      open={ctxProducer.farmDetailModalOpen}
      onOpenChange={ctxProducer.setFarmDetailModalOpen}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-xl text-green-800">
              {ctxProducer.farmSelected?.name}
            </DialogTitle>
            <DialogDescription>
              {ctxProducer.farmSelected?.city},{" "}
              {ctxProducer.farmSelected?.state}
            </DialogDescription>
          </div>
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

          {/* Tab de detalhes da propriedade */}
          <TabsContent value="details" className="mt-0">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Área Total</p>
                <p className="text-lg font-semibold">
                  {ctxProducer.farmSelected?.totalArea} ha
                </p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Localização</p>
                <p className="text-lg font-semibold">
                  {ctxProducer.farmSelected?.city},{" "}
                  {ctxProducer.farmSelected?.state}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">
                  Área Agricultável
                </p>
                <p className="text-lg font-semibold">
                  {ctxProducer.farmSelected?.agriculturalArea} ha
                </p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">
                  Área de Vegetação
                </p>
                <p className="text-lg font-semibold">
                  {ctxProducer.farmSelected?.vegetationArea} ha
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Tab de gráfico destribuição de áreas */}
          <TabsContent value="area" className="mt-0">
            <div className="border rounded-md p-4 bg-white">
              <h5 className="text-sm font-medium text-center mb-4">
                Distribuição de Áreas
              </h5>
              <FarmAreaChart
                totalArea={Number(ctxProducer.farmSelected?.totalArea ?? 0)}
                vegetationArea={Number(
                  ctxProducer.farmSelected?.vegetationArea ?? 0
                )}
                agriculturalArea={Number(
                  ctxProducer.farmSelected?.agriculturalArea ?? 0
                )}
              />
            </div>
          </TabsContent>

          {/* Tab de gráfico de culturas plantadas */}
          <TabsContent value="crops" className="mt-0">
            <div className="border rounded-md p-4 bg-white">
              <h5 className="text-sm font-medium text-center mb-4">
                Culturas Plantadas
              </h5>
              <FarmCropsChart farm={ctxProducer.farmSelected} />
            </div>
          </TabsContent>

          {/* Tab de safras e culturas */}
          <TabsContent value="harvests" className="mt-0">
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-sm font-medium">Safras e Culturas</h5>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-700 hover:text-green-800 hover:bg-green-50"
                  onClick={handleAddHarvest}
                >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Nova Safra
                </Button>
              </div>

              {existsHarvest ? (
                <div className="space-y-4">
                  {ctxProducer.farmSelected?.harvests.map((harvest) => (
                    <div key={harvest.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-green-600" />
                          <h6 className="font-medium">Safra {harvest.year}</h6>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-green-700"
                          onClick={() => handleEditHarvest(harvest)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar safra</span>
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {harvest.crops.map((crop) => (
                          <Badge
                            key={crop.id}
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={handleAddHarvest}
                  >
                    <PlusCircle className="mr-1 h-4 w-4" />
                    Adicionar Safra
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              ctxProducer.setFarmDetailModalOpen(false);
              ctxProducer.setFarmSelected(null);
            }}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
