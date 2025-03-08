"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, TractorIcon as Farm, MapPin, Sprout } from "lucide-react";
import { ProducerModal } from "@/components/producer-modal";
import { FarmModal } from "@/components/farm-modal";
import { AreaChart } from "@/components/area-chart";
import { StateChart } from "@/components/state-chart";
import { CropChart } from "@/components/crop-chart";
import { LandUseChart } from "@/components/land-use-chart";
import { initialData } from "@/lib/data";
import type { Producer } from "@/lib/types";
import { ProducerListCards } from "@/components/producer-list-cards";

export default function Dashboard() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [isProducerModalOpen, setIsProducerModalOpen] = useState(false);
  const [isFarmModalOpen, setIsFarmModalOpen] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(
    null
  );
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    setProducers([initialData]);
  }, []);

  const totalFarms = producers.reduce(
    (acc, producer) => acc + producer.farms.length,
    0
  );
  const totalArea = producers.reduce(
    (acc, producer) =>
      acc + producer.farms.reduce((sum, farm) => sum + farm.totalArea, 0),
    0
  );

  const handleAddProducer = (producer: Producer) => {
    setProducers([...producers, producer]);
    setIsProducerModalOpen(false);
  };

  const handleEditProducer = (updatedProducer: Producer) => {
    setProducers(
      producers.map((p) => (p.id === updatedProducer.id ? updatedProducer : p))
    );
    setSelectedProducer(null);
    setIsProducerModalOpen(false);
  };

  const handleDeleteProducer = (id: string) => {
    setProducers(producers.filter((p) => p.id !== id));
  };

  const handleAddFarm = (producerId: string, farm: any) => {
    setProducers(
      producers.map((p) => {
        if (p.id === producerId) {
          return {
            ...p,
            farms: [...p.farms, farm],
          };
        }
        return p;
      })
    );
    setIsFarmModalOpen(false);
  };

  const handleAddHarvest = (farmId: string, harvest: any) => {
    setProducers(
      producers.map((p) => {
        const updatedFarms = p.farms.map((f) => {
          if (f.id === farmId) {
            return {
              ...f,
              harvests: [...f.harvests, harvest],
            };
          }
          return f;
        });

        if (updatedFarms.some((f) => f.id === farmId)) {
          return {
            ...p,
            farms: updatedFarms,
          };
        }
        return p;
      })
    );
    setSelectedFarmId(null);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList className="bg-green-50 text-green-800">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-white"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="producers"
                className="data-[state=active]:bg-white"
              >
                Produtores
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={() => setIsProducerModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 sm:ml-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Produtor
            </Button>
          </div>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <Card className="border-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Fazendas
                  </CardTitle>
                  <Farm className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {totalFarms}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Propriedades rurais cadastradas
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Área Total
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {totalArea} ha
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hectares registrados
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Culturas
                  </CardTitle>
                  <Sprout className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-800">
                    {producers.reduce((acc, producer) => {
                      const crops = new Set();
                      producer.farms.forEach((farm) => {
                        farm.harvests.forEach((harvest) => {
                          harvest.crops.forEach((crop) => crops.add(crop.name));
                        });
                      });
                      return acc + crops.size;
                    }, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tipos de culturas plantadas
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="col-span-1 sm:col-span-2 border-green-100">
                <CardHeader>
                  <CardTitle>Área por Fazenda</CardTitle>
                  <CardDescription>
                    Distribuição de áreas entre as propriedades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart producers={producers} />
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Por Estado</CardTitle>
                  <CardDescription>
                    Distribuição de fazendas por estado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StateChart producers={producers} />
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Uso do Solo</CardTitle>
                  <CardDescription>
                    Área agricultável vs. vegetação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LandUseChart producers={producers} />
                </CardContent>
              </Card>

              <Card className="col-span-1 sm:col-span-2 lg:col-span-4 border-green-100">
                <CardHeader>
                  <CardTitle>Culturas Plantadas</CardTitle>
                  <CardDescription>
                    Distribuição por tipo de cultura
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CropChart producers={producers} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="producers">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Produtores Rurais</CardTitle>
                <CardDescription>
                  Gerencie os produtores e suas propriedades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProducerListCards
                  producers={producers}
                  onEdit={(producer) => {
                    setSelectedProducer(producer);
                    setIsProducerModalOpen(true);
                  }}
                  onDelete={handleDeleteProducer}
                  onAddFarm={(producerId) => {
                    setSelectedProducer(
                      producers.find((p) => p.id === producerId) || null
                    );
                    setIsFarmModalOpen(true);
                  }}
                  onAddHarvest={handleAddHarvest}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {isProducerModalOpen && (
        <ProducerModal
          producer={selectedProducer}
          onClose={() => {
            setIsProducerModalOpen(false);
            setSelectedProducer(null);
          }}
          onSave={selectedProducer ? handleEditProducer : handleAddProducer}
        />
      )}

      {isFarmModalOpen && selectedProducer && (
        <FarmModal
          producerId={selectedProducer.id}
          onClose={() => {
            setIsFarmModalOpen(false);
            setSelectedProducer(null);
          }}
          onSave={handleAddFarm}
        />
      )}
    </div>
  );
}
